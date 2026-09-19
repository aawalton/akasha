import { expect, test } from "bun:test"
import {
  type Beside,
  type SidecarsBy,
  sidecarsIn,
} from "akasha/page/index/modules/beside-declaring/beside-declaring.module.code.ts"
import type { FilePropertiesBy } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  A,
  claimingBeside,
  filedAs,
  HELD_PAGE,
  withholding,
} from "akasha/page/index/modules/entries/index-entries.module.test-fixtures.ts"
import {
  claimsOf,
  type IsThere,
  pathsOf,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  ADDON,
  claimantBelow,
  claimantClosing,
  claimantNamed,
  GROUP_MEMBERS,
  GROUP_OWN,
  groupClaiming,
  ONE_MEMBER,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.test-fixtures.ts"

test("a property no page property declares to be a file is filed under no path", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", definition: "what is held" }

  expect(pathsOf(value, "/repo/a.domain.ts", "/repo", filedAs("domain", { code: null }))).toEqual([
    "a.domain.ts",
  ])
})

test("a property whose name is written in camel is filed under its kebab slug", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", codeOf: "ts" }

  expect(
    pathsOf(value, "/repo/a.module.ts", "/repo", filedAs("module", { "code-of": null }))
  ).toEqual(["a.module.ts", "a.module.code-of.ts"])
})

test("a property stating the name its file stands under claims that name in the page's own directory", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", manifest: "json" }

  expect(
    pathsOf(
      value,
      "/repo/deep/a.module.ts",
      "/repo",
      filedAs("module", { manifest: "package.json" })
    )
  ).toEqual(["deep/a.module.ts", "deep/package.json"])
})

test("a property stating no name is still claimed under the name the grammar builds", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }

  expect(
    pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs("module", { code: null }))
  ).toEqual(["deep/a.module.ts", "deep/a.module.code.ts"])
})

test("the numbered files of a property are claimed alongside the first while they are there", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }
  const held = new Set(["deep/a.module.code.part2.ts", "deep/a.module.code.part3.ts"])
  const there = (at: string): boolean => held.has(at)

  expect(
    pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs("module", { code: null }), there)
  ).toEqual([
    "deep/a.module.ts",
    "deep/a.module.code.ts",
    "deep/a.module.code.part2.ts",
    "deep/a.module.code.part3.ts",
  ])
})

test("a numbered file past a gap in the numbering is claimed by no page", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }
  const held = new Set(["deep/a.module.code.part3.ts"])
  const there = (at: string): boolean => held.has(at)

  expect(
    pathsOf(value, "/repo/deep/a.module.ts", "/repo", filedAs("module", { code: null }), there)
  ).toEqual(["deep/a.module.ts", "deep/a.module.code.ts"])
})

test("a page carrying both is claimed under the built name and under the stated one", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", manifest: "json" }
  const filed = filedAs("module", { code: null, manifest: "package.json" })

  expect(pathsOf(value, "/repo/deep/a.module.ts", "/repo", filed)).toEqual([
    "deep/a.module.ts",
    "deep/a.module.code.ts",
    "deep/package.json",
  ])
})

const LINES = { pagePropertySlug: "lines", uncommitted: true, default: "jsonl" }

const LINED = filedAs("held-type", { lines: null })

const VALUES = "deep/a.held-type.uncommitted.ts"

const FIRST = "deep/a.held-type.lines.uncommitted.jsonl"

const PART2 = "deep/a.held-type.lines.part2.uncommitted.jsonl"

const PART3 = "deep/a.held-type.lines.part3.uncommitted.jsonl"

test("a file property a page type declares uncommitted claims no file that is not there", () => {
  expect(claimingBeside(LINES, LINED)).toEqual([HELD_PAGE])
})

test("that same property is claimed under its uncommitted name once that file is there", () => {
  expect(claimingBeside(LINES, LINED, (at) => at === FIRST)).toEqual([HELD_PAGE, FIRST])
})

const PATCH = { pagePropertySlug: "patch", default: "diff" }

const PATCH_AT = "deep/a.held-type.patch.diff"

test("a file property a page type declares without that word claims no file that is not there", () => {
  expect(claimingBeside(PATCH, filedAs("held-type", { patch: null }))).toEqual([HELD_PAGE])
})

test("that same property is claimed under its plain name once that file is there", () => {
  expect(
    claimingBeside(PATCH, filedAs("held-type", { patch: null }), (at) => at === PATCH_AT)
  ).toEqual([HELD_PAGE, PATCH_AT])
})

test("the numbered files of an uncommitted property are claimed while they are there", () => {
  const there = new Set([FIRST, PART2, PART3])

  expect(claimingBeside(LINES, LINED, (at) => there.has(at))).toEqual([
    HELD_PAGE,
    FIRST,
    PART2,
    PART3,
  ])
})

test("naming an uncommitted property's files stops at the first that is not there", () => {
  const there = new Set([FIRST, PART3])

  expect(claimingBeside(LINES, LINED, (at) => there.has(at))).toEqual([HELD_PAGE, FIRST])
})

const SOPS = "deep/a.held-type.sops.yaml"

test("a page whose type declares a secret claims no sops file where that file is not there", () => {
  expect(claimingBeside({ secret: true }, filedAs("held-type", {}))).toEqual([HELD_PAGE])
})

test("that same page claims the sops file beside it as soon as that file is there", () => {
  expect(claimingBeside({ secret: true }, filedAs("held-type", {}), (at) => at === SOPS)).toEqual([
    HELD_PAGE,
    SOPS,
  ])
})

test("a page whose type declares an uncommitted value claims no values file that is not there", () => {
  expect(claimingBeside({ uncommitted: true }, filedAs("held-type", {}))).toEqual([HELD_PAGE])
})

test("that same page claims the values file beside it as soon as that file is there", () => {
  expect(
    claimingBeside({ uncommitted: true }, filedAs("held-type", {}), (at) => at === VALUES)
  ).toEqual([HELD_PAGE, VALUES])
})

const NOTED = { id: A, pageTypeSlug: "held-type", slug: "a", notes: "jsonl" }

const NOTES = filedAs("held-type", { notes: null })

const NOTES_OUTSIDE = "deep/a.held-type.notes.uncommitted.jsonl"

const NOTES_PART2 = "deep/a.held-type.notes.part2.uncommitted.jsonl"

test("a property the page states is claimed under its uncommitted name where its type holds it so", () => {
  const there = new Set([NOTES_PART2])

  expect(
    claimsOf(
      NOTED,
      `/repo/${HELD_PAGE}`,
      "/repo",
      NOTES,
      sidecarsIn([]),
      withholding("notes"),
      (at) => there.has(at)
    )
  ).toEqual([HELD_PAGE, NOTES_OUTSIDE, NOTES_PART2])
})

test("that same property is claimed under its plain name where its type holds it in the commit", () => {
  expect(claimsOf(NOTED, `/repo/${HELD_PAGE}`, "/repo", NOTES, sidecarsIn([]))).toEqual([
    HELD_PAGE,
    "deep/a.held-type.notes.jsonl",
  ])
})

test("a page carrying a group claims no member's file that is not there", () => {
  expect(groupClaiming()).toEqual([GROUP_OWN])
})

test("that same page claims a file for each member that is there, while stating none of them", () => {
  const there = new Set(GROUP_MEMBERS)

  expect(groupClaiming((at) => there.has(at))).toEqual([GROUP_OWN, ...GROUP_MEMBERS])
})

test("a member whose file alone is there is the only member claimed", () => {
  expect(groupClaiming((at) => at === ONE_MEMBER)).toEqual([GROUP_OWN, ONE_MEMBER])
})

const NO_FILES: FilePropertiesBy = new Map()

const NONE: SidecarsBy = new Map()

const BESIDES: ReadonlyMap<string, Beside> = new Map()

const VALUE = { id: A, pageTypeSlug: "domain", slug: "a" }

const REPO = "/repo"

const AT = "/repo/a.domain.ts"

const SECRET: SidecarsBy = new Map([
  ["domain", { secret: true, uncommitted: false, besides: BESIDES }],
])

const UNCOMMITTED: SidecarsBy = new Map([
  ["domain", { secret: false, uncommitted: true, besides: BESIDES }],
])

const sopsThere: IsThere = (at) => at === "a.domain.sops.yaml"

const besideThere: IsThere = (at) => at === "a.domain.uncommitted.ts"

const patchThere: IsThere = (at) => at === "a.domain.patch.diff"

test("a value carrying no id claims its own path as a value carrying one does", () => {
  expect(claimsOf({ pageTypeSlug: "domain", slug: "a" }, AT, REPO, NO_FILES, NONE)).toEqual([
    "a.domain.ts",
  ])
})

test("a value carrying no slug claims its own path as a value carrying one does", () => {
  expect(claimsOf({ id: A, pageTypeSlug: "domain" }, AT, REPO, NO_FILES, NONE)).toEqual([
    "a.domain.ts",
  ])
})

test("a page whose type declares a secret claims no sops file while that file is not there", () => {
  expect(claimsOf(VALUE, AT, REPO, NO_FILES, SECRET)).toEqual(["a.domain.ts"])
})

test("that same page's claims carry the sops file as soon as that file is there", () => {
  expect(claimsOf(VALUE, AT, REPO, NO_FILES, SECRET, undefined, sopsThere)).toEqual([
    "a.domain.ts",
    "a.domain.sops.yaml",
  ])
})

test("a page whose type declares an uncommitted value claims no file that is not there", () => {
  expect(claimsOf(VALUE, AT, REPO, NO_FILES, UNCOMMITTED)).toEqual(["a.domain.ts"])
})

test("that same page claims the file beside it as soon as that file is there", () => {
  expect(claimsOf(VALUE, AT, REPO, NO_FILES, UNCOMMITTED, undefined, besideThere)).toEqual([
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
  expect(claimsOf(VALUE, AT, REPO, PATCH_FILED, DRAFTING)).toEqual(["a.domain.ts"])
  expect(claimsOf(VALUE, AT, REPO, PATCH_FILED, DRAFTING, undefined, patchThere)).toEqual([
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

  expect(claimsOf(stating, AT, REPO, PATCH_FILED, held)).toEqual([
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

  expect(claimsOf(VALUE, AT, REPO, NO_FILES, held, undefined, besideThere)).toEqual([
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

  expect(claimsOf(VALUE, AT, REPO, filed, held)).toEqual(["a.domain.ts"])
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

  expect(claimsOf(value, "/repo/deep/a.module.ts", REPO, filed, NONE)).toEqual([
    "deep/a.module.ts",
    "deep/a.module.code.ts",
    "deep/a.module.test.ts",
  ])
})

test("the folder a page names is claimed by that page, as is anything beneath it", () => {
  expect(claimantBelow("deep/Icons")).toBe(ADDON)
  expect(claimantBelow("deep/Icons/one.dds")).toBe(ADDON)
  expect(claimantBelow("deep/Icons/under/one.dds")).toBe(ADDON)
})

test("a path outside that folder or over no page of that type is claimed by nothing", () => {
  expect(claimantBelow("deep/one.dds")).toBeNull()
  expect(claimantBelow("other/Icons/one.dds")).toBeNull()
})

test("a name a page type declares for a file claims nothing beneath that name", () => {
  expect(claimantNamed("deep/Bindings.xml")).toBe(ADDON)
  expect(claimantNamed("deep/Bindings.xml/one.txt")).toBeNull()
})

test("a file closing with an extension a page type declares is claimed beside the page", () => {
  expect(claimantClosing("deep/one.dds")).toBe(ADDON)
  expect(claimantClosing("deep/Icons/one.dds")).toBe(ADDON)
})

test("a file closing that way is claimed by no page above the folder holding it", () => {
  expect(claimantClosing("deep/under/one.dds")).toBeNull()
  expect(claimantClosing("other/one.dds")).toBeNull()
})

test("a file closing with an extension no page type declares is claimed by nothing", () => {
  expect(claimantClosing("deep/one.txt")).toBeNull()
})
