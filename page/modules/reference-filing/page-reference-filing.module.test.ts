import { afterAll, expect, test } from "bun:test"
import { domain } from "akasha/domain/domain.page-type.ts"
import { B, shaped } from "akasha/page/index/modules/entries/index-entries.module.test-fixtures.ts"
import type { Child, Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  put,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  importedFrom,
  namedFor,
  namedFrom,
  namedOut,
  ownedAnew,
  propertiesRenamedIn,
  turnedLine,
} from "akasha/page/modules/reference-filing/page-reference-filing.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const NOTE_AT = `${pageType.slug}/note` as const

const FROM = "akasha/a.domain.ts"

const MINE = "01a04b79-0000-7000-8000-00000000000a"

const CODE_AT = "akasha/a.module.code.ts"

const NO_ROWS = [] as const

const TYPE_AT = "akasha/module.page-type.ts"

const TYPE_ID = "01a04b79-0000-7000-8000-00000000000c"

const PAGE_AT = "akasha/b.module.ts"

const PAGE_ID = "01a04b79-0000-7000-8000-00000000000b"

const AT_TYPES = "page-type/page-type/slug"

const AT_MODULES = "page-type/module/slug"

const LISTED = new Map<string, readonly Child[]>([
  [AT_TYPES, [{ name: "module.jsonl", directory: false }]],
  [AT_MODULES, [{ name: "b.jsonl", directory: false }]],
])

const FILED = new Map<string, readonly string[]>([
  [`${AT_TYPES}/module.jsonl`, [`{"path":"${TYPE_AT}","id":"${TYPE_ID}"}`]],
  [`${AT_MODULES}/b.jsonl`, [`{"path":"${PAGE_AT}","id":"${PAGE_ID}"}`]],
])

const BODIES = new Map<string, string>([
  [TYPE_AT, "export const held = 1\n"],
  [PAGE_AT, "export const b = 1\n"],
])

const INDEXED: Reading = {
  holds: (at) => at === "",
  listing: (at) => LISTED.get(at) ?? [],
  lines: (at) => FILED.get(at) ?? [],
  read: (path) => BODIES.get(path) ?? null,
}

test("a name reaching a page files a line into the file beside the page named", () => {
  const value = { id: MINE, type: DOMAIN_AT, partSlugs: ["domain/b"] }

  expect(namedFrom(value, FROM, shaped({ "domain/b": B }), "", NO_ROWS)).toEqual({
    entries: [
      {
        at: "b.domain.referenced-by.jsonl",
        line: `{"propertySlug":"part-slugs","path":"${FROM}","id":"${MINE}"}`,
      },
    ],
    refused: [],
  })
})

test("a name reaching a page is answered as the property said and the page reached", () => {
  const value = { id: MINE, type: DOMAIN_AT, partSlugs: ["domain/b"] }

  expect(namedOut(value, shaped({ "domain/b": B }), NO_ROWS)).toEqual([
    { propertySlug: "part-slugs", path: "b.domain.ts" },
  ])
})

test("a name reaching no page is answered with nothing rather than reported", () => {
  const value = { id: MINE, type: DOMAIN_AT, partSlugs: ["domain/nowhere"] }

  expect(namedOut(value, shaped({}), NO_ROWS)).toEqual([])
})

test("a page naming the same page twice through one property files one line", () => {
  const value = { id: MINE, type: DOMAIN_AT, partSlugs: ["domain/b", "domain/b"] }

  expect(namedFrom(value, FROM, shaped({ "domain/b": B }), "", NO_ROWS).entries.length).toBe(1)
})

test("a page stating no id files nothing", () => {
  const value = { type: DOMAIN_AT, partSlugs: ["domain/b"] }

  expect(namedFrom(value, FROM, shaped({ "domain/b": B }), "", NO_ROWS).entries).toEqual([])
})

test("a name reaching no page is reported rather than filed", () => {
  const value = { id: MINE, type: DOMAIN_AT, partSlugs: ["domain/nowhere"] }
  const filed = namedFrom(value, FROM, shaped({}), "", NO_ROWS)

  expect(filed.entries).toEqual([])
  expect(filed.refused[0]).toContain("no `domain` carries the slug `nowhere`")
})

test("a name of a mortal page type reaching nothing is neither filed nor reported", () => {
  const value = { id: MINE, type: DOMAIN_AT, goneSlugs: ["gone"] }
  const filed = namedFrom(value, FROM, shaped({}), "", NO_ROWS)

  expect(filed.entries).toEqual([])
  expect(filed.refused).toEqual([])
})

test("a name a page of a mortal page type states is not reported where it reaches nothing", () => {
  const value = { id: MINE, type: NOTE_AT, partSlugs: ["domain/nowhere"] }

  expect(namedFrom(value, FROM, shaped({}), "", NO_ROWS).refused).toEqual([])
})

test("an import files a line into the file beside the page the file imported belongs to", () => {
  const body = 'import { one } from "./b.module.code.ts"\n'

  expect(importedFrom(INDEXED, body, CODE_AT, "")).toEqual([
    {
      at: "akasha/b.module.referenced-by.jsonl",
      line: `{"propertySlug":"import","fileName":"b.module.code.ts","path":"${CODE_AT}","typed":false,"deferred":false}`,
    },
  ])
})

test("an import files whether that import names a type and whether it is followed later", () => {
  const body =
    'import type { One } from "./b.module.code.ts"\nconst two = await import("./b.module.code.ts")\n'

  expect(importedFrom(INDEXED, body, CODE_AT, "").map((one) => one.line)).toEqual([
    `{"propertySlug":"import","fileName":"b.module.code.ts","path":"${CODE_AT}","typed":true,"deferred":false}`,
    `{"propertySlug":"import","fileName":"b.module.code.ts","path":"${CODE_AT}","typed":false,"deferred":true}`,
  ])
})

test("a file imported the same way twice files one line", () => {
  const body =
    'import { one } from "./b.module.code.ts"\nimport { two } from "./b.module.code.ts"\n'

  expect(importedFrom(INDEXED, body, CODE_AT, "")).toHaveLength(1)
})

test("an import of a page's own file names that file rather than naming none", () => {
  const body = 'import type { One } from "./b.module.ts"\n'

  expect(importedFrom(INDEXED, body, CODE_AT, "")).toEqual([
    {
      at: "akasha/b.module.referenced-by.jsonl",
      line: `{"propertySlug":"import","fileName":"b.module.ts","path":"${CODE_AT}","typed":true,"deferred":false}`,
    },
  ])
})

test("an imported file belonging to no page files no line", () => {
  expect(importedFrom(INDEXED, 'import { x } from "./routes.ts"\n', CODE_AT, "")).toEqual([])
})

test("an imported file named for a page whose file is nowhere files no line", () => {
  const body = 'import type { One } from "./+types/b.module.code"\n'

  expect(importedFrom(INDEXED, body, CODE_AT, "")).toEqual([])
})

test("a body that is no typescript files no import", () => {
  expect(
    importedFrom(INDEXED, 'import { x } from "./b.module.code.ts"\n', "akasha/a.module.md", "")
  ).toEqual([])
})

afterAll(scratch.sweep, 5000)

const NAMING = { id: "3", propertySlug: "part-slugs" }

test("a property keeping its id under a new slug is renamed from the old slug", () => {
  const renamed = propertiesRenamedIn([
    { path: "part-slugs.relation-property.ts", was: { ...NAMING, slug: "part-slugs" }, now: null },
    {
      path: "piece-slugs.relation-property.ts",
      was: null,
      now: { ...NAMING, slug: "piece-slugs" },
    },
  ])

  expect([...renamed]).toEqual([["part-slugs", "piece-slugs"]])
})

test("a page that is no property is renamed from nothing", () => {
  const renamed = propertiesRenamedIn([
    { path: "a.domain.ts", was: { id: "4", slug: "a" }, now: { id: "4", slug: "b" } },
  ])

  expect(renamed.size).toBe(0)
})

test("a line naming a renamed slug is turned, and any other line is left as it was", () => {
  const renamed = new Map([["part-slugs", "piece-slugs"]])
  const other = `{"propertySlug":"parts","path":"${FROM}","id":"${MINE}"}`

  expect(turnedLine(`{"propertySlug":"part-slugs","path":"${FROM}","id":"${MINE}"}`, renamed)).toBe(
    `{"propertySlug":"piece-slugs","path":"${FROM}","id":"${MINE}"}`
  )
  expect(turnedLine(other, renamed)).toBe(other)
})

const OWNED = [
  "held/lone.module.code.ts",
  "held/lone.module.test.ts",
  "held/lone.module.ts",
  "held/other.module.ts",
]

function ownedTree(): string {
  const root = scratch.rootFor("akasha-reference-filing-")
  for (const at of OWNED) put(root, at, "export const it = 1\n")
  return root
}

test("the files a page's name opens are the files that page owns", () => {
  expect(namedFor(ownedTree(), "held/lone.module.ts")).toEqual(OWNED.slice(0, 3))
})

test("a page arriving owns anew the files beside it that the change does not carry", () => {
  const held = [{ path: "held/lone.module.ts", was: null, now: { id: "6", slug: "lone" } }]

  expect(ownedAnew(held, ownedTree(), new Set(["held/lone.module.ts"]))).toEqual(OWNED.slice(0, 2))
})

test("a page already there owns nothing anew", () => {
  const page = { id: "6", slug: "lone" }

  expect(
    ownedAnew([{ path: "held/lone.module.ts", was: page, now: page }], ownedTree(), new Set())
  ).toEqual([])
})
