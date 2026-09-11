import { expect, test } from "bun:test"
import {
  type Besides,
  besidesTurned,
  pagesElsewhere,
  pagesStranded,
  pagesTurned,
} from "akasha/pages/indexes/beside-turning/beside-turning.module.code.ts"
import { filePropertiesIn } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { sidecarsIn } from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import { everyPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

type Held = Record<string, unknown>

const CODE: Held = { pageTypeSlug: "file-property", slug: "code", propertySlug: "code" }

const ENTRIES: Held = { pageTypeSlug: "file-property", slug: "entries", propertySlug: "entries" }

const aType = (slug: string, above: readonly string[], properties: readonly Held[]): Held => ({
  pageTypeSlug: "page-type",
  slug,
  extends: above,
  properties,
})

const declaring = (slug: string, rest: Held = {}): Held => ({
  pagePropertySlug: slug,
  required: false,
  many: false,
  ...rest,
})

const BASE = aType("base", [], [])

const BLAND = aType("bland", ["base"], [])

const AT = "value/bland.jsonl"

const PAGE = "one.bland.ts"

const BESIDE = "one.bland.code.ts"

const PATHS = "listing/path.jsonl"

const READING: Reading = {
  holds: (at) => at === "",
  listing: (at) => (at === "value" ? [{ name: "bland.jsonl", directory: false }] : []),
  lines: (at) => {
    if (at === AT) {
      return [JSON.stringify({ path: PAGE, value: { pageTypeSlug: "bland", slug: "one" } })]
    }
    return at === PATHS ? [PAGE, BESIDE] : []
  },
}

function besidesOf(values: readonly Held[]): Besides {
  return { fileProperties: filePropertiesIn(values), sidecars: sidecarsIn(values) }
}

test("a page type gaining a file property is turned, and one changing nothing is not", () => {
  const was = besidesOf([CODE, BASE, BLAND])
  const now = besidesOf([CODE, aType("base", [], [declaring("code")]), BLAND])

  expect([...besidesTurned(was, was)]).toEqual([])
  expect([...besidesTurned(was, now)].sort()).toEqual(["base", "bland"])
})

test("a declaration gaining a default turns its page type though the file properties are the same", () => {
  const was = besidesOf([ENTRIES, aType("base", [], [declaring("entries")])])
  const now = besidesOf([ENTRIES, aType("base", [], [declaring("entries", { default: "jsonl" })])])

  expect(now.fileProperties.get("base")).toEqual(was.fileProperties.get("base"))
  expect([...besidesTurned(was, now)]).toEqual(["base"])
})

test("a page type the change leaves naming no page type strands the pages already of it", () => {
  const trial = aType("trial", ["base"], [])

  expect(pagesStranded(READING, [BLAND], [trial], new Set()).map((one) => one.path)).toEqual([
    "one.bland.ts",
  ])
  expect(pagesStranded(READING, [BLAND], [BLAND], new Set())).toEqual([])
  expect(pagesStranded(READING, [BLAND], [trial], new Set(["one.bland.ts"]))).toEqual([])
})

test("a page already of a turned page type is answered, and one the change carries is not", () => {
  const was = besidesOf([CODE, BASE, BLAND])
  const now = besidesOf([CODE, BASE, aType("bland", ["base"], [declaring("code")])])

  expect(pagesTurned(READING, was, now, new Set()).map((one) => one.path)).toEqual(["one.bland.ts"])
  expect(pagesTurned(READING, was, now, new Set(["one.bland.ts"]))).toEqual([])
})

test("a file that is no page is not answered though the index names that file", () => {
  const turned = new Set(["id"])

  expect(everyPath(READING)).toEqual([PAGE, BESIDE])
  expect(pagesElsewhere(READING, turned, new Set()).map((one) => one.path)).toEqual([PAGE])
  expect(pagesElsewhere(READING, new Set(), new Set())).toEqual([])
  expect(pagesElsewhere(READING, turned, new Set([PAGE]))).toEqual([])
})
