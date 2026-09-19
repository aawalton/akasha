import { expect, test } from "bun:test"
import { akasha } from "akasha/akasha.domain.ts"
import { akashaWorkspace } from "akasha/akasha-workspace.workspace.ts"
import { alanBook } from "akasha/alan/book/alan-book.page-type.ts"
import { myMath } from "akasha/alan/book/pages/my-math/my-math.alan-book.ts"
import { myStrategy } from "akasha/alan/book/pages/my-strategy/my-strategy.alan-book.ts"
import {
  addressingOver,
  holdingOver,
  namesFiling,
  type Paged,
  pageNameOf,
  partOfOver,
  partsOver,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.code.ts"
import {
  folderFrom,
  GENERATED_AT,
  gatheringFrom,
  MANIFEST_AT,
  MY_MATH_AT,
  segmented,
  segmentedLater,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import { collectionPartsUnderTheirPlural } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/collection-parts-under-their-plural/collection-parts-under-their-plural.folder-shape.code.ts"
import { workspace } from "akasha/code/workspace/workspace.page-type.ts"
import { decisionKind } from "akasha/domain/decision-kind/decision-kind.page-type.ts"
import { departure } from "akasha/domain/decision-kind/pages/departure.decision-kind.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import type { FoldersBy } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { type Held, heldIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

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

const MY_STRATEGY = "alan/book/my-strategy"

const MY_STRATEGY_SECTIONS = `${MY_STRATEGY}/sections`

const BOOK = `${alanBook.slug}/${myStrategy.slug}` as const

const MATH = `${alanBook.slug}/${myMath.slug}` as const

const SECTION_TYPES = new Set<string>(["alan-book", "book-section"])

const SECTION_FILES = new Set<string>(["chapter-text"])

const SCOPED = new Map<string, Value>([
  [MY_MATH_AT, { pageTypeSlug: "book-section", slug: "beginnings", partOfCollections: [MATH] }],
  [
    `${MY_STRATEGY_SECTIONS}/beginnings.book-section.ts`,
    { pageTypeSlug: "book-section", slug: "beginnings", partOfCollections: [BOOK] },
  ],
  [
    `${MY_STRATEGY_SECTIONS}/two.book-section.ts`,
    { pageTypeSlug: "book-section", slug: "two", partOfCollections: [BOOK] },
  ],
])

const scopedPartOf = partOfOver({ pageByPath: (at) => SCOPED.get(at) ?? null })

function sectioned(at: string): Held {
  return heldIn(at, SECTION_TYPES, SECTION_FILES)
}

test("two sections slugged alike under different books each name the book holding it", () => {
  const strategy = sectioned(`${MY_STRATEGY_SECTIONS}/beginnings.book-section.ts`)
  expect(scopedPartOf(sectioned(MY_MATH_AT))).toEqual([MATH])
  expect(scopedPartOf(strategy)).toEqual([BOOK])
})

const sectionsFolder = folderFrom({
  folder: MY_STRATEGY_SECTIONS,
  pageTypes: SECTION_TYPES,
  fileProperties: SECTION_FILES,
  extending: (pageTypeSlug, wanted) => pageTypeSlug === wanted,
  holds: (at) => (at === MY_STRATEGY ? [BOOK] : []),
  partOf: scopedPartOf,
  gathered: gatheringFrom({ sections: ["book-section"] }),
})

test("the sections shape takes a folder whose sections the index reaches by path", () => {
  const said = collectionPartsUnderTheirPlural(
    sectionsFolder(["beginnings.book-section.ts", "two.book-section.ts"])
  )
  expect(said).toEqual([])
})

test("that shape still refuses a section the index cannot reach by path", () => {
  const said = collectionPartsUnderTheirPlural(
    sectionsFolder(["beginnings.book-section.ts", "stray.book-section.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("stray.book-section.ts")
  expect(said[0]).toContain(`\`${BOOK}\``)
})

const HOLDER_AT = `${MY_STRATEGY_SECTIONS}/beginnings.book-section.ts`

const HOLDING = new Map<string, Value>([
  [HOLDER_AT, { pageTypeSlug: "book-section", slug: "beginnings", parts: ["book-section/two"] }],
])

test("the page in a folder is read by its path, so a scoped page states its slug and parts", () => {
  const holds = holdingOver(
    { pageByPath: (asked) => HOLDING.get(asked) ?? null },
    { at: () => [HOLDER_AT], foldersIn: () => [] },
    SECTION_TYPES,
    SECTION_FILES
  )
  expect(holds(MY_STRATEGY_SECTIONS).names).toEqual(["beginnings"])
  expect(holds(MY_STRATEGY_SECTIONS).paths).toEqual([HOLDER_AT])
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
  expect([...holds("").holds]).toEqual([
    `${domain.slug}/${akasha.slug}`,
    `${workspace.slug}/${akashaWorkspace.slug}`,
  ])
  expect([...holds("").declared]).toEqual(["domain/agents"])
})

const CHAPTER_AT = "story/world/pages/ember/stories/read/dawn/chapters/one.story-chapter-read.ts"

const DEPARTURE_AT = `${decisionKind.slug}/${departure.slug}` as const

const CHAPTER: Value = {
  pageTypeSlug: "story-chapter-read",
  slug: "one",
  title: "Chapter 1",
  story: "story-read/dawn",
  position: 1,
  decisions: [{ decisionKind: DEPARTURE_AT, statement: "A chapter names a story." }],
}

test("a page answers with every value on it reading as a page type slug and a slug", () => {
  const addressing = addressingOver({ pageByPath: () => CHAPTER })
  expect(addressing(CHAPTER_AT)).toEqual(["story-read/dawn", DEPARTURE_AT])
})

test("a page the index reaches by no path answers with no address", () => {
  const addressing = addressingOver({ pageByPath: () => null })
  expect(addressing(CHAPTER_AT)).toEqual([])
})

test("the page a claimed file sits beside is the one the index names", () => {
  expect(pageNameOf("akasha/page/index/index.domain.ts")).toBe("index.domain")
  expect(
    namesFiling(
      new Map([
        ["manifest", "package.json"],
        ["code", null],
      ])
    )
  ).toEqual(new Map([["package.json", "manifest"]]))
})
