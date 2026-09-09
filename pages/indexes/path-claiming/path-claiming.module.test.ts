import { expect, test } from "bun:test"
import {
  A,
  claimingBeside,
  filedAs,
  HELD_PAGE,
} from "../entries/index-entries.module.test-fixtures.ts"
import { claimsOf, pathsOf, sidecarsIn } from "./path-claiming.module.code.ts"

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

test("the files beside a page are read from every page type above it", () => {
  const values = [
    {
      id: "1",
      pageTypeSlug: "page-type",
      slug: "one",
      properties: [{ secret: true }, { pagePropertySlug: "patch", default: "one-default" }],
    },
    {
      id: "2",
      pageTypeSlug: "page-type",
      slug: "two",
      properties: [{ uncommitted: true }, { pagePropertySlug: "patch", default: "two-default" }],
    },
    {
      id: "3",
      pageTypeSlug: "page-type",
      slug: "both",
      extends: ["page-type/one", "page-type/two"],
    },
  ]

  const said = sidecarsIn(values).get("both")

  expect(said?.secret).toBe(true)
  expect(said?.uncommitted).toBe(true)
  expect([...(said?.besides ?? [])]).toEqual([
    ["patch", { held: "two-default", uncommitted: false }],
  ])
})

const LINES = { pagePropertySlug: "lines", uncommitted: true, default: "jsonl" }

const LINED = filedAs("held-type", { lines: null })

const VALUES = "deep/a.held-type.uncommitted.ts"

const FIRST = "deep/a.held-type.lines.uncommitted.jsonl"

const PART2 = "deep/a.held-type.lines.part2.uncommitted.jsonl"

const PART3 = "deep/a.held-type.lines.part3.uncommitted.jsonl"

test("a file property a page type declares uncommitted is claimed under its uncommitted name", () => {
  expect(claimingBeside(LINES, LINED)).toEqual([HELD_PAGE, VALUES, FIRST])
})

test("a file property a page type declares without that word is claimed under its plain name", () => {
  const said = { pagePropertySlug: "patch", default: "diff" }

  expect(claimingBeside(said, filedAs("held-type", { patch: null }))).toEqual([
    HELD_PAGE,
    "deep/a.held-type.patch.diff",
  ])
})

test("the numbered files of an uncommitted property are claimed while they are there", () => {
  const there = new Set([PART2, PART3])

  expect(claimingBeside(LINES, LINED, (at) => there.has(at))).toEqual([
    HELD_PAGE,
    VALUES,
    FIRST,
    PART2,
    PART3,
  ])
})

test("naming an uncommitted property's files stops at the first that is not there", () => {
  expect(claimingBeside(LINES, LINED, (at) => at === PART3)).toEqual([HELD_PAGE, VALUES, FIRST])
})

test("a page whose type declares an uncommitted value claims the values file beside the page", () => {
  expect(claimingBeside({ uncommitted: true }, filedAs("held-type", {}))).toEqual([
    HELD_PAGE,
    VALUES,
  ])
})

const GROUPING = [
  { id: "1", pageTypeSlug: "page-type", slug: "file-property-group", properties: [] },
  {
    id: "2",
    pageTypeSlug: "page-type",
    slug: "module-property-group",
    extends: ["page-type/file-property-group"],
    properties: [
      { pageProperty: "code-file-property/code", fixed: "ts" },
      { pageProperty: "code-file-property/test", fixed: "ts" },
    ],
  },
  {
    id: "3",
    pageTypeSlug: "page-type",
    slug: "code-check",
    properties: [{ pageProperty: "module-property-group/audit" }],
  },
]

test("a page type declaring a file property group has a file beside it for every member", () => {
  expect([...(sidecarsIn(GROUPING).get("code-check")?.besides ?? [])]).toEqual([
    ["audit.code", { held: "ts", uncommitted: false }],
    ["audit.test", { held: "ts", uncommitted: false }],
  ])
})

test("a page of a file property group page type has no file of its own beside it", () => {
  expect([...(sidecarsIn(GROUPING).get("module-property-group")?.besides ?? [])]).toEqual([])
})

test("a page carrying a group claims a file for each member while stating none of them", () => {
  const value = { id: A, pageTypeSlug: "code-check", slug: "a" }
  const filed = filedAs("code-check", { "audit.code": null, "audit.test": null })

  expect(
    claimsOf(value, "/repo/deep/a.code-check.ts", "/repo", filed, sidecarsIn(GROUPING))
  ).toEqual([
    "deep/a.code-check.ts",
    "deep/a.code-check.audit.code.ts",
    "deep/a.code-check.audit.test.ts",
  ])
})
