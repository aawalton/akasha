import { expect, test } from "bun:test"
import type { FoldersBy } from "@akasha/indexes/entries"
import { type Held, heldIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import {
  holdingOver,
  namesFiling,
  type Paged,
  pageNameOf,
  partOfOver,
  partsOver,
} from "./folder-matches-a-shape.code-check.decision.code.ts"
import {
  folderFrom,
  segmented,
  segmentedLater,
} from "./folder-matches-a-shape.code-check.test-fixtures.ts"
import { sectionsOfTheBookAbove } from "./folder-shapes/sections-of-the-book-above/sections-of-the-book-above.folder-shape.code.ts"

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

const MANIFEST_AT = "akasha/one/manifests/one-manifests.manifest.ts"

const GENERATED_AT = "akasha/one/manifests/generated"

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

const MY_MATH_AT = "alan/books/my-math/sections/beginnings.book-section.ts"

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
