import { expect, test } from "bun:test"
import {
  holdingOver,
  namesFiling,
  type Paged,
  pageNameOf,
  partOfOver,
  partsOver,
} from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.decision.code.ts"
import {
  folderFrom,
  GENERATED_AT,
  MANIFEST_AT,
  MY_MATH_AT,
  segmented,
  segmentedLater,
} from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.decision.test-fixtures.ts"
import { sectionsOfTheBookAbove } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/sections-of-the-book-above/sections-of-the-book-above.folder-shape.code.ts"
import { type Held, heldIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { FoldersBy } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const ROOT = "/repo"

test("a folder holding nothing but files a property names is passed over", () => {
  expect(segmented("one/deploy")).toBe(true)
  expect(segmented("two/deploy")).toBe(false)
  expect(segmented("four/deploy")).toBe(false)
})

test("a segment comes from the properties, so a property stated later is reached", () => {
  expect(segmented("three/public")).toBe(false)
  expect(segmentedLater("three/public")).toBe(true)
})

const MANIFEST_TYPES = new Set<string>(["manifest"])

const FOLDER_PROPERTIES: FoldersBy = new Map([
  ["manifest", new Map([["generated-directory", "generated"]])],
])

function paging(value: Value): Paged {
  return { pageByPath: () => value }
}

function claimed(value: Value): readonly string[] {
  const parts = partsOver(
    paging(value),
    ROOT,
    new Map(),
    new Map(),
    new Map(),
    FOLDER_PROPERTIES,
    () => false
  )
  return parts(heldIn(MANIFEST_AT, MANIFEST_TYPES, new Set<string>()))
}

test("a page stating a folder property claims the folder that property names", () => {
  expect(
    claimed({ pageTypeSlug: "manifest", slug: "one-manifests", generatedDirectory: true })
  ).toEqual([MANIFEST_AT, GENERATED_AT])
})

test("a page stating no folder property claims its own file and nothing beside it", () => {
  expect(claimed({ pageTypeSlug: "manifest", slug: "one-manifests" })).toEqual([MANIFEST_AT])
})

const MY_STRATEGY = "alan/books/my-strategy"

const MY_STRATEGY_SECTIONS = `${MY_STRATEGY}/sections`

const SECTION_TYPES = new Set<string>(["alan-book", "book-section"])

const SECTION_FILES = new Set<string>(["chapter-text"])

const SCOPED = new Map<string, Value>([
  [
    MY_MATH_AT,
    { pageTypeSlug: "book-section", slug: "beginnings", partOfCollections: ["my-math"] },
  ],
  [
    `${MY_STRATEGY_SECTIONS}/beginnings.book-section.ts`,
    { pageTypeSlug: "book-section", slug: "beginnings", partOfCollections: ["my-strategy"] },
  ],
  [
    `${MY_STRATEGY_SECTIONS}/two.book-section.ts`,
    { pageTypeSlug: "book-section", slug: "two", partOfCollections: ["my-strategy"] },
  ],
])

const scopedPartOf = partOfOver({ pageByPath: (at) => SCOPED.get(at) ?? null })

function sectioned(at: string): Held {
  return heldIn(at, SECTION_TYPES, SECTION_FILES)
}

test("two sections slugged alike under different books each name the book holding it", () => {
  const strategy = sectioned(`${MY_STRATEGY_SECTIONS}/beginnings.book-section.ts`)
  expect(scopedPartOf(sectioned(MY_MATH_AT))).toEqual(["my-math"])
  expect(scopedPartOf(strategy)).toEqual(["my-strategy"])
})

const sectionsFolder = folderFrom({
  folder: MY_STRATEGY_SECTIONS,
  pageTypes: SECTION_TYPES,
  fileProperties: SECTION_FILES,
  extending: (pageTypeSlug, wanted) => pageTypeSlug === wanted,
  holds: (at) => (at === MY_STRATEGY ? ["alan-book/my-strategy"] : []),
  partOf: scopedPartOf,
})

test("the sections shape takes a folder whose sections the index reaches by path", () => {
  const said = sectionsOfTheBookAbove(
    sectionsFolder(["beginnings.book-section.ts", "two.book-section.ts"])
  )
  expect(said).toEqual([])
})

test("that shape still refuses a section the index cannot reach by path", () => {
  const said = sectionsOfTheBookAbove(
    sectionsFolder(["beginnings.book-section.ts", "stray.book-section.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("stray.book-section.ts")
  expect(said[0]).toContain("`my-strategy`")
})

const HOLDER_AT = `${MY_STRATEGY_SECTIONS}/beginnings.book-section.ts`

const HOLDING = new Map<string, Value>([
  [
    HOLDER_AT,
    {
      pageTypeSlug: "book-section",
      slug: "beginnings",
      pluralSlug: "beginnings-parts",
      parts: ["book-section/two"],
    },
  ],
])

test("the page in a folder is read by its path, so a scoped page states its plural and parts", () => {
  const holds = holdingOver(
    { pageByPath: (asked) => HOLDING.get(asked) ?? null },
    { at: () => [HOLDER_AT], foldersIn: () => [] },
    SECTION_TYPES,
    SECTION_FILES
  )
  expect(holds(MY_STRATEGY_SECTIONS).names).toEqual(["beginnings", "beginnings-parts"])
  expect([...holds(MY_STRATEGY_SECTIONS).declared]).toEqual(["book-section/two"])
})

const ROOT_DOMAIN = "akasha.domain.ts"

const ROOT_WORKSPACE = "akasha-workspace.workspace.ts"

const ROOTED = new Map<string, Value>([
  [ROOT_DOMAIN, { pageTypeSlug: "domain", slug: "akasha", parts: ["domain/agents"] }],
  [ROOT_WORKSPACE, { pageTypeSlug: "workspace", slug: "akasha-workspace" }],
])

test("a workspace beside a domain answers for the domain and for what that domain declares", () => {
  const holds = holdingOver(
    { pageByPath: (asked) => ROOTED.get(asked) ?? null },
    { at: () => [ROOT_WORKSPACE, ROOT_DOMAIN], foldersIn: () => [] },
    new Set<string>(["domain", "workspace"]),
    new Set<string>()
  )
  expect(holds("").names).toEqual(["akasha"])
  expect([...holds("").holds]).toEqual(["domain/akasha", "workspace/akasha-workspace"])
  expect([...holds("").declared]).toEqual(["domain/agents"])
})

test("the page a claimed file sits beside is the one the index names", () => {
  expect(pageNameOf("akasha/pages-system/indexes/indexes.workspace-package.ts")).toBe(
    "indexes.workspace-package"
  )
  expect(
    namesFiling(
      new Map([
        ["manifest", "package.json"],
        ["code", null],
      ])
    )
  ).toEqual(new Map([["package.json", "manifest"]]))
})
