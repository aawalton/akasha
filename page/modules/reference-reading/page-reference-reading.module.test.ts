import { expect, test } from "bun:test"
import type { Child, Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  idsNaming,
  importersOf,
  namersAt,
  namersOf,
} from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"

const NAMED_AT = "akasha/b.domain.ts"

const NAMER_AT = "akasha/a.module.ts"

const NAMED_ID = "01a0a2e9-c513-7eed-aa47-000000000002"

const NAMER_ID = "01a0a2e9-c513-7eed-aa47-000000000001"

const APP_TYPE_ID = "01a0a2e9-c513-7eed-aa47-000000000003"

const APP_ID = "01a0a2e9-c513-7eed-aa47-000000000004"

const APP_TYPE_AT = "akasha/router-app.page-type.ts"

const APP_AT = "akasha/web/held-web.router-app.ts"

const ROUTES_AT = "akasha/web/routes.ts"

const ROUTING_AT = "akasha/web/routes/one.route.test.ts"

const TYPED = `export const routerApp = ${JSON.stringify({
  id: APP_TYPE_ID,
  pageTypeSlug: "page-type",
  slug: "router-app",
  properties: [{ pageProperty: "code-file-property/route-table" }],
})}\n`

const SHAPED = `${JSON.stringify({
  pageTypeSlug: "code-file-property",
  slug: "route-table",
  propertySlug: "route-table",
  fileName: "routes.ts",
})}\n`

const ID_FILED_AT = `page/id/${NAMED_ID}.jsonl`

const HELD: Record<string, string> = {
  [ID_FILED_AT]: `{"path":"${NAMED_AT}","id":"${NAMED_ID}"}`,
  "page-type/page-type/slug/domain.jsonl":
    '{"path":"akasha/domain.page-type.ts","id":"01a0a2e9-c513-7eed-aa47-000000000005"}',
  "page-type/page-type/slug/module.jsonl":
    '{"path":"akasha/module.page-type.ts","id":"01a0a2e9-c513-7eed-aa47-000000000006"}',
  "page-type/page-type/slug/router-app.jsonl": `{"path":"${APP_TYPE_AT}","id":"${APP_TYPE_ID}"}`,
  "page-type/router-app/slug/held-web.jsonl": `{"path":"${APP_AT}","id":"${APP_ID}"}`,
  [APP_TYPE_AT]: TYPED,
  "akasha/router-app.page-type.shapes.jsonl": SHAPED,
  "akasha/b.domain.referenced-by.jsonl": [
    '{"propertySlug":"import","fileName":"b.domain.code.ts","path":"akasha/a.module.code.ts"}',
    `{"propertySlug":"parts","path":"${NAMER_AT}","id":"${NAMER_ID}"}`,
    "",
  ].join("\n"),
  "akasha/web/held-web.router-app.referenced-by.jsonl": `{"propertySlug":"import","fileName":"routes.ts","path":"${ROUTING_AT}"}\n`,
}

function listedIn(held: Record<string, string>, at: string): readonly Child[] {
  const under = at === "" ? "" : `${at}/`
  const found = new Map<string, boolean>()
  for (const one of Object.keys(held)) {
    if (!one.startsWith(under) || one === at) continue
    const rest = one.slice(under.length)
    const slash = rest.indexOf("/")
    found.set(slash === -1 ? rest : rest.slice(0, slash), slash !== -1)
  }
  return [...found].map(([name, directory]) => ({ name, directory }))
}

function worldOf(held: Record<string, string>): Reading {
  return {
    holds: (at) => at === "" || at in held,
    listing: (at) => listedIn(held, at),
    lines: (at) => (held[at] ?? "").split("\n").filter((one) => one !== ""),
    read: (path) => held[path] ?? null,
  }
}

test("the pages naming a page through one property are answered by id", () => {
  expect(idsNaming(worldOf(HELD), NAMED_ID, "parts")).toEqual([NAMER_ID])
  expect(idsNaming(worldOf(HELD), NAMED_ID, "domain")).toEqual([])
})

test("who names a page is answered with the property each name comes through, imports left out", () => {
  expect(namersOf(worldOf(HELD), NAMED_ID)).toEqual([{ path: NAMER_AT, propertySlug: "parts" }])
})

const UNFILED: Record<string, string> = Object.fromEntries(
  Object.entries(HELD).filter(([at]) => at !== ID_FILED_AT)
)

test("who names a page is answered beside that page, though no id in the index reaches it", () => {
  expect(namersAt(worldOf(UNFILED), NAMED_AT)).toEqual([{ path: NAMER_AT, propertySlug: "parts" }])
  expect(namersOf(worldOf(UNFILED), NAMED_ID)).toEqual([])
})

test("who imports a file beside a page is read from that page's file", () => {
  expect(importersOf(worldOf(HELD), "akasha/b.domain.code.ts")).toEqual(["akasha/a.module.code.ts"])
})

test("a file nothing imports answers nothing, though its page is referenced", () => {
  expect(importersOf(worldOf(HELD), NAMED_AT)).toEqual([])
})

test("a page no id reaches is referenced by nothing", () => {
  expect(idsNaming(worldOf(HELD), NAMER_ID, "parts")).toEqual([])
})

test("a page whose file is missing is referenced by nothing", () => {
  expect(importersOf(worldOf(HELD), "akasha/a.module.code.ts")).toEqual([])
})

test("a path that is no page file belongs to no page", () => {
  expect(importersOf(worldOf(HELD), "akasha/notes.md")).toEqual([])
})

test("who imports a file a page type names outright is read beside the page naming it", () => {
  expect(importersOf(worldOf(HELD), ROUTES_AT)).toEqual([ROUTING_AT])
})
