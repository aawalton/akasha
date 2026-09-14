import { expect, test } from "bun:test"
import {
  LISTED_AT,
  LISTED_UNDER,
  listedOf,
  pathsIn,
} from "akasha/pages/indexes/listing/index-listing.index.code.ts"
import type { FilePropertiesBy } from "akasha/pages/indexes/modules/entries/index-entries.module.code.ts"
import {
  A,
  filedAs,
} from "akasha/pages/indexes/modules/entries/index-entries.module.test-fixtures.ts"
import type {
  Beside,
  IsThere,
  SidecarsBy,
} from "akasha/pages/indexes/modules/path-claiming/path-claiming.module.code.ts"

const NO_FILES: FilePropertiesBy = new Map()

const NONE: SidecarsBy = new Map()

const BESIDES: ReadonlyMap<string, Beside> = new Map()

const VALUE = { id: A, pageTypeSlug: "domain", slug: "a" }

const REPO = "/repo"

const AT = "/repo/a.domain.ts"

const PAGE_WITH_CODE = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }

const PAGE_WITH_CODE_AT = "/repo/a.module.ts"

const CODE_FILED = filedAs("module", { code: null })

const SECRET: SidecarsBy = new Map([
  ["domain", { secret: true, uncommitted: false, besides: BESIDES }],
])

const UNCOMMITTED: SidecarsBy = new Map([
  ["domain", { secret: false, uncommitted: true, besides: BESIDES }],
])

const SOPS_THERE: IsThere = (at) => at === "a.domain.sops.yaml"

const BESIDE_THERE: IsThere = (at) => at === "a.domain.uncommitted.ts"

const PATCH_THERE: IsThere = (at) => at === "a.domain.patch.diff"

test("the one file this index files is named for the index", () => {
  expect(LISTED_UNDER).toBe("listing")
  expect(LISTED_AT).toBe("listing/path.jsonl")
})

test("every path a page claims is one line of that one file", () => {
  const claimed = pathsIn(PAGE_WITH_CODE, PAGE_WITH_CODE_AT, REPO, CODE_FILED, NONE)

  expect(listedOf(claimed)).toEqual([
    { at: LISTED_AT, line: "a.module.ts" },
    { at: LISTED_AT, line: "a.module.code.ts" },
  ])
})

test("a line carries the path alone, saying nothing of the page it belongs to", () => {
  expect(listedOf(pathsIn(VALUE, AT, REPO, NO_FILES, NONE))).toEqual([
    { at: LISTED_AT, line: "a.domain.ts" },
  ])
})

test("a value carrying no id is filed here for nothing", () => {
  expect(pathsIn({ pageTypeSlug: "domain", slug: "a" }, AT, REPO, NO_FILES, NONE)).toEqual([])
})

test("a value carrying no slug is filed here for nothing", () => {
  expect(pathsIn({ id: A, pageTypeSlug: "domain" }, AT, REPO, NO_FILES, NONE)).toEqual([])
})

test("a page whose type declares a secret claims no sops file while that file is not there", () => {
  expect(pathsIn(VALUE, AT, REPO, NO_FILES, SECRET)).toEqual(["a.domain.ts"])
})

test("that same page claims the sops file beside it as soon as that file is there", () => {
  expect(pathsIn(VALUE, AT, REPO, NO_FILES, SECRET, undefined, SOPS_THERE)).toEqual([
    "a.domain.ts",
    "a.domain.sops.yaml",
  ])
})

test("a page whose type declares an uncommitted value claims no file that is not there", () => {
  expect(pathsIn(VALUE, AT, REPO, NO_FILES, UNCOMMITTED)).toEqual(["a.domain.ts"])
})

test("that same page claims the file beside it as soon as that file is there", () => {
  expect(pathsIn(VALUE, AT, REPO, NO_FILES, UNCOMMITTED, undefined, BESIDE_THERE)).toEqual([
    "a.domain.ts",
    "a.domain.uncommitted.ts",
  ])
})

const DRAFTING: SidecarsBy = new Map([
  [
    "domain",
    {
      secret: false,
      uncommitted: true,
      besides: new Map([["patch", { held: "diff", uncommitted: false }]]),
    },
  ],
])

const PATCH_FILED: FilePropertiesBy = new Map([["domain", new Map([["patch", null]])]])

test("a page whose type gives a file property a default claims no file that is not there", () => {
  expect(pathsIn(VALUE, AT, REPO, PATCH_FILED, DRAFTING)).toEqual(["a.domain.ts"])
  expect(pathsIn(VALUE, AT, REPO, PATCH_FILED, DRAFTING, undefined, PATCH_THERE)).toEqual([
    "a.domain.ts",
    "a.domain.patch.diff",
  ])
})

test("a page stating the property its type defaults claims that file once", () => {
  const stating = { ...VALUE, patch: "diff" }
  const held: SidecarsBy = new Map([
    [
      "domain",
      {
        secret: false,
        uncommitted: false,
        besides: new Map([["patch", { held: "diff", uncommitted: false }]]),
      },
    ],
  ])

  expect(pathsIn(stating, AT, REPO, PATCH_FILED, held)).toEqual([
    "a.domain.ts",
    "a.domain.patch.diff",
  ])
})

test("an uncommitted value held in no file claims no file beside the page", () => {
  const held: SidecarsBy = new Map([
    [
      "domain",
      {
        secret: false,
        uncommitted: true,
        besides: new Map([["model", { held: "ts", uncommitted: false }]]),
      },
    ],
  ])

  expect(pathsIn(VALUE, AT, REPO, NO_FILES, held, undefined, BESIDE_THERE)).toEqual([
    "a.domain.ts",
    "a.domain.uncommitted.ts",
  ])
})

test("a property naming its file outright claims no uncommitted file beside it", () => {
  const held: SidecarsBy = new Map([
    [
      "domain",
      {
        secret: false,
        uncommitted: false,
        besides: new Map([["manifest", { held: "json", uncommitted: false }]]),
      },
    ],
  ])
  const filed: FilePropertiesBy = new Map([["domain", new Map([["manifest", "package.json"]])]])

  expect(pathsIn(VALUE, AT, REPO, filed, held)).toEqual(["a.domain.ts"])
})

test("a file a page property holds is claimed under its own path", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  const filed: FilePropertiesBy = new Map([
    [
      "module",
      new Map([
        ["code", null],
        ["test", null],
      ]),
    ],
  ])

  expect(pathsIn(value, "/repo/deep/a.module.ts", REPO, filed, NONE)).toEqual([
    "deep/a.module.ts",
    "deep/a.module.code.ts",
    "deep/a.module.test.ts",
  ])
})
