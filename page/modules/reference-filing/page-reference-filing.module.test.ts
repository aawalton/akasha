import { expect, test } from "bun:test"
import { B, shaped } from "akasha/page/index/modules/entries/index-entries.module.test-fixtures.ts"
import type { Child, Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  importedFrom,
  namedFrom,
  namedOut,
} from "akasha/page/modules/reference-filing/page-reference-filing.module.code.ts"

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
  const value = { id: MINE, pageTypeSlug: "domain", partSlugs: ["domain/b"] }

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
  const value = { id: MINE, pageTypeSlug: "domain", partSlugs: ["domain/b"] }

  expect(namedOut(value, shaped({ "domain/b": B }), NO_ROWS)).toEqual([
    { propertySlug: "part-slugs", path: "b.domain.ts" },
  ])
})

test("a name reaching no page is answered with nothing rather than reported", () => {
  const value = { id: MINE, pageTypeSlug: "domain", partSlugs: ["domain/nowhere"] }

  expect(namedOut(value, shaped({}), NO_ROWS)).toEqual([])
})

test("a page naming the same page twice through one property files one line", () => {
  const value = { id: MINE, pageTypeSlug: "domain", partSlugs: ["domain/b", "domain/b"] }

  expect(namedFrom(value, FROM, shaped({ "domain/b": B }), "", NO_ROWS).entries.length).toBe(1)
})

test("a page stating no id files nothing", () => {
  const value = { pageTypeSlug: "domain", partSlugs: ["domain/b"] }

  expect(namedFrom(value, FROM, shaped({ "domain/b": B }), "", NO_ROWS).entries).toEqual([])
})

test("a name reaching no page is reported rather than filed", () => {
  const value = { id: MINE, pageTypeSlug: "domain", partSlugs: ["domain/nowhere"] }
  const filed = namedFrom(value, FROM, shaped({}), "", NO_ROWS)

  expect(filed.entries).toEqual([])
  expect(filed.refused[0]).toContain("no `domain` carries the slug `nowhere`")
})

test("a name of a mortal page type reaching nothing is neither filed nor reported", () => {
  const value = { id: MINE, pageTypeSlug: "domain", goneSlugs: ["gone"] }
  const filed = namedFrom(value, FROM, shaped({}), "", NO_ROWS)

  expect(filed.entries).toEqual([])
  expect(filed.refused).toEqual([])
})

test("an import files a line into the file beside the page the file imported belongs to", () => {
  const body = 'import { one } from "./b.module.code.ts"\n'

  expect(importedFrom(INDEXED, body, CODE_AT, "")).toEqual([
    {
      at: "akasha/b.module.referenced-by.jsonl",
      line: `{"propertySlug":"import","fileName":"b.module.code.ts","path":"${CODE_AT}"}`,
    },
  ])
})

test("an import of a page's own file names that file rather than naming none", () => {
  const body = 'import type { One } from "./b.module.ts"\n'

  expect(importedFrom(INDEXED, body, CODE_AT, "")).toEqual([
    {
      at: "akasha/b.module.referenced-by.jsonl",
      line: `{"propertySlug":"import","fileName":"b.module.ts","path":"${CODE_AT}"}`,
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
