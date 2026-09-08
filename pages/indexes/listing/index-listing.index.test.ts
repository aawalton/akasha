import { expect, test } from "bun:test"
import type { Beside, FilePropertiesBy, SidecarsBy } from "../entries/index-entries.module.code.ts"
import { A } from "../entries/index-entries.module.test-fixtures.ts"
import { pathIn } from "../path/index-path.index.code.ts"
import { LISTED_AT, LISTED_UNDER, listedOf } from "./index-listing.index.code.ts"

const BESIDES: ReadonlyMap<string, Beside> = new Map()

const NO_FILES: FilePropertiesBy = new Map()

const NONE: SidecarsBy = new Map()

const SECRET: SidecarsBy = new Map([
  ["domain", { secret: true, uncommitted: false, besides: BESIDES }],
])

const VALUE = { id: A, pageTypeSlug: "domain", slug: "a" }

const AT = "/repo/a.domain.ts"

test("the one file this index files is named for the index", () => {
  expect(LISTED_UNDER).toBe("listing")
  expect(LISTED_AT).toBe("listing/path.jsonl")
})

test("every path the path index files is one line of that one file", () => {
  const filed = pathIn(VALUE, AT, "/repo", NO_FILES, SECRET)

  expect(listedOf(filed)).toEqual([
    { at: LISTED_AT, line: "a.domain.ts" },
    { at: LISTED_AT, line: "a.domain.sops.yaml" },
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
