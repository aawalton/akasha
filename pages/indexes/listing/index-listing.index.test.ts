import { expect, test } from "bun:test"
import {
  LISTED_AT,
  LISTED_UNDER,
  listedOf,
} from "akasha/pages/indexes/listing/index-listing.index.code.ts"
import type { FilePropertiesBy } from "akasha/pages/indexes/modules/entries/index-entries.module.code.ts"
import {
  A,
  filedAs,
} from "akasha/pages/indexes/modules/entries/index-entries.module.test-fixtures.ts"
import {
  pageClaimsOf,
  type SidecarsBy,
} from "akasha/pages/indexes/modules/path-claiming/path-claiming.module.code.ts"

const NO_FILES: FilePropertiesBy = new Map()

const NONE: SidecarsBy = new Map()

const VALUE = { id: A, pageTypeSlug: "domain", slug: "a" }

const REPO = "/repo"

const AT = "/repo/a.domain.ts"

const PAGE_WITH_CODE = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }

const PAGE_WITH_CODE_AT = "/repo/a.module.ts"

const CODE_FILED = filedAs("module", { code: null })

test("the one file this index files is named for the index", () => {
  expect(LISTED_UNDER).toBe("listing")
  expect(LISTED_AT).toBe("listing/path.jsonl")
})

test("every path a page claims is one line of that one file", () => {
  const claimed = pageClaimsOf(PAGE_WITH_CODE, PAGE_WITH_CODE_AT, REPO, CODE_FILED, NONE)

  expect(listedOf(claimed)).toEqual([
    { at: LISTED_AT, line: "a.module.ts" },
    { at: LISTED_AT, line: "a.module.code.ts" },
  ])
})

test("a line carries the path alone, saying nothing of the page it belongs to", () => {
  expect(listedOf(pageClaimsOf(VALUE, AT, REPO, NO_FILES, NONE))).toEqual([
    { at: LISTED_AT, line: "a.domain.ts" },
  ])
})
