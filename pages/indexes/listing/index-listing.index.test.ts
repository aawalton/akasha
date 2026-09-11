import { expect, test } from "bun:test"
import type { FilePropertiesBy } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { A, filedAs } from "akasha/pages/indexes/entries/index-entries.module.test-fixtures.ts"
import {
  LISTED_AT,
  LISTED_UNDER,
  listedOf,
} from "akasha/pages/indexes/listing/index-listing.index.code.ts"
import { pathIn } from "akasha/pages/indexes/path/index-path.index.code.ts"
import type { SidecarsBy } from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"

const NO_FILES: FilePropertiesBy = new Map()

const NONE: SidecarsBy = new Map()

const VALUE = { id: A, pageTypeSlug: "domain", slug: "a" }

const AT = "/repo/a.domain.ts"

const PAGE_WITH_CODE = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }

const PAGE_WITH_CODE_AT = "/repo/a.module.ts"

const CODE_FILED = filedAs("module", { code: null })

test("the one file this index files is named for the index", () => {
  expect(LISTED_UNDER).toBe("listing")
  expect(LISTED_AT).toBe("listing/path.jsonl")
})

test("every path the path index files is one line of that one file", () => {
  const filed = pathIn(PAGE_WITH_CODE, PAGE_WITH_CODE_AT, "/repo", CODE_FILED, NONE)

  expect(listedOf(filed)).toEqual([
    { at: LISTED_AT, line: "a.module.ts" },
    { at: LISTED_AT, line: "a.module.code.ts" },
  ])
})

test("a line carries the path alone, without the id the path index carries", () => {
  const filed = pathIn(VALUE, AT, "/repo", NO_FILES, NONE)

  expect(listedOf(filed)).toEqual([{ at: LISTED_AT, line: "a.domain.ts" }])
})

test("a page the path index files nothing for is filed here for nothing", () => {
  const filed = pathIn({ pageTypeSlug: "domain", slug: "a" }, AT, "/repo", NO_FILES, NONE)

  expect(listedOf(filed)).toEqual([])
})
