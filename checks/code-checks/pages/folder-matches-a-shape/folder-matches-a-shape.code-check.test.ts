import { expect, test } from "bun:test"
import { NAMING_NONE } from "@akasha/code/code-specifier"
import type { FoldersBy } from "@akasha/indexes/entries"
import type { Change } from "@akasha/pages/change"
import { type Held, heldIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import {
  answeringTo,
  edgesOf,
  foldersJudgedBy,
  foldersTouchedBy,
  type Holds,
  heldFolder,
  holdingOver,
  namesFiling,
  namingFolderOf,
  namingOver,
  openingWith,
  type Paged,
  pageNameOf,
  partOfOver,
  partsOver,
  strippedOf,
} from "./folder-matches-a-shape.code-check.code.ts"
import {
  folderFrom,
  segmented,
  segmentedLater,
} from "./folder-matches-a-shape.code-check.test-fixtures.ts"
import { sectionsOfTheBookAbove } from "./folder-shapes/sections-of-the-book-above/sections-of-the-book-above.folder-shape.code.ts"
import {
  ancestorsOf,
  folderOf,
  type Grouped,
  reachedFolders,
} from "./modules/folder-grouping/folder-grouping.module.code.ts"

const ROOT = "/repo"

const encoder = new TextEncoder()

function change(
  changed: readonly string[],
  now: Readonly<Record<string, string | null>>,
  before: Readonly<Record<string, string | null>>
): Change {
  const bodied = (held: Readonly<Record<string, string | null>>) => (path: string) => {
    const said = held[path]
    return said === undefined || said === null ? null : encoder.encode(said)
  }
  return { root: ROOT, changed, after: bodied(now), before: bodied(before) }
}

function holding(named: Readonly<Record<string, readonly string[]>>): Holds {
  return (folder) => ({
    names: named[folder] ?? [],
    holds: [],
    declared: new Set<string>(),
  })
}

function grouping(under: Readonly<Record<string, readonly string[]>>): Grouped {
  return {
    at: () => [],
    foldersIn: (folder) => under[folder] ?? [],
  }
}

test("a folder holding nothing but files a property names is passed over", () => {
  expect(segmented("one/deploy")).toBe(true)
  expect(segmented("two/deploy")).toBe(false)
  expect(segmented("four/deploy")).toBe(false)
})

test("a segment comes from the properties, so a property stated later is reached", () => {
  expect(segmented("three/public")).toBe(false)
  expect(segmentedLater("three/public")).toBe(true)
})

test("a folder is every part of a path but its last", () => {
  expect(folderOf("akasha/a/b/one.ts")).toBe("akasha/a/b")
  expect(folderOf("one.ts")).toBe("")
})

test("every folder above a path is an ancestor, nearest first", () => {
  expect(ancestorsOf("akasha/a/b/one.ts")).toEqual(["akasha/a/b", "akasha/a", "akasha"])
})

test("an import reaches the folders holding it, stopping where the importer is too", () => {
  expect(reachedFolders("akasha/c/two.ts", "akasha/a/one.ts")).toEqual(["akasha/c"])
})

test("an import inside a folder is no entrance to it, so that folder is not reached", () => {
  expect(reachedFolders("akasha/a/deep/two.ts", "akasha/a/one.ts")).toEqual(["akasha/a/deep"])
})

test("a relative specifier makes an edge and a package specifier makes none", () => {
  const body = 'import { one } from "./two.ts"\nimport ts from "typescript"\n'
  expect([...edgesOf(ROOT, "akasha/a/one.ts", encoder.encode(body))]).toEqual(["akasha/a/two.ts"])
})

test("a body that is nothing makes no edge", () => {
  expect([...edgesOf(ROOT, "akasha/a/one.ts", null)]).toEqual([])
})

test("a changed path carries every folder above it", () => {
  const said = foldersTouchedBy(change(["akasha/a/b/one.ts"], { "akasha/a/b/one.ts": "" }, {}))
  expect([...said].sort()).toEqual(["akasha", "akasha/a", "akasha/a/b"])
})

test("an import the change adds carries the folder it reaches", () => {
  const said = foldersTouchedBy(
    change(
      ["akasha/a/one.ts"],
      { "akasha/a/one.ts": 'import { two } from "../c/two.ts"\n' },
      { "akasha/a/one.ts": "" }
    )
  )
  expect(said.has("akasha/c")).toBe(true)
})

test("an import the change takes away carries the folder it used to reach", () => {
  const said = foldersTouchedBy(
    change(
      ["akasha/a/one.ts"],
      { "akasha/a/one.ts": "" },
      { "akasha/a/one.ts": 'import { two } from "../c/two.ts"\n' }
    )
  )
  expect(said.has("akasha/c")).toBe(true)
})

test("an import the change leaves unchanged carries no folder of its own", () => {
  const body = 'import { two } from "../c/two.ts"\n'
  const said = foldersTouchedBy(
    change(["akasha/a/one.ts"], { "akasha/a/one.ts": body }, { "akasha/a/one.ts": body })
  )
  expect(said.has("akasha/c")).toBe(false)
})

test("a path the change takes away still carries the folders above it", () => {
  const said = foldersTouchedBy(
    change(["akasha/a/one.ts"], { "akasha/a/one.ts": null }, { "akasha/a/one.ts": "" })
  )
  expect(said.has("akasha/a")).toBe(true)
})

test("the opening a name shares with the page above it is taken off, and no more", () => {
  expect(strippedOf("temper-world-zones", ["temper-world", "temper-worlds"])).toBe("zones")
  expect(strippedOf("zones", ["temper-world", "temper-worlds"])).toBe("zones")
})

test("the opening is taken off again while what is left still opens with a name above", () => {
  expect(openingWith("y-z", ["x", "y"])).toBe("y")
  expect(strippedOf("x-y-z", ["x", "y"])).toBe("z")
})

test("a name the page above is named leaves nothing, so no name is worked out", () => {
  expect(strippedOf("temper-skills", ["temper-skill", "temper-skills"])).toBe(null)
})

test("a folder wanting a name that cannot be worked out still wants a name", () => {
  const naming = namingOver(
    holding({
      "akasha/temper-skills": ["temper-skills", "temper-skills"],
      "akasha/temper-skills/skills": ["temper-skill", "temper-skills"],
    })
  )
  expect(naming("akasha/temper-skills/skills")).toEqual({ name: null, gives: "temper-skills" })
})

test("a folder named `pages` the page in it names is that page's folder rather than a part", () => {
  const holds = holding({ "akasha/pages-system/pages": ["page", "pages"] })
  expect(heldFolder("akasha/pages-system/pages", holds)).toBe(false)
  expect(namingFolderOf("akasha/pages-system/pages/address", holds)).toBe(
    "akasha/pages-system/pages"
  )
})

test("a folder named `pages` the page in it does not name is a part, and is looked through", () => {
  const holds = holding({ "akasha/foo/pages": ["bar"] })
  expect(heldFolder("akasha/foo/pages", holds)).toBe(true)
  expect(namingFolderOf("akasha/foo/pages/deep", holds)).toBe("akasha/foo")
})

test("a folder named `pages` holding no page at all is a part", () => {
  const holds = holding({})
  expect(heldFolder("akasha/foo/pages", holds)).toBe(true)
  expect(namingFolderOf("akasha/foo/pages/deep", holds)).toBe("akasha/foo")
})

test("a folder named `scripts` the page in it does not name is a part, and is looked through", () => {
  const holds = holding({ "akasha/foo/scripts": ["bar"] })
  expect(heldFolder("akasha/foo/scripts", holds)).toBe(true)
  expect(namingFolderOf("akasha/foo/scripts/deep", holds)).toBe("akasha/foo")
})

test("a folder named `scripts` the page in it names is that page's folder rather than a part", () => {
  const holds = holding({ "akasha/code-system/scripts": ["script", "scripts"] })
  expect(heldFolder("akasha/code-system/scripts", holds)).toBe(false)
  expect(namingFolderOf("akasha/code-system/scripts/deep", holds)).toBe(
    "akasha/code-system/scripts"
  )
})

test("every part between a folder and the page above it is looked through", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  expect(namingFolderOf("akasha/foo/modules/pages/deep", holds)).toBe("akasha/foo")
})

test("a folder named for no part is never looked through", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  expect(heldFolder("akasha/foo/other", holds)).toBe(false)
  expect(namingFolderOf("akasha/foo/other/deep", holds)).toBe("akasha/foo/other")
})

test("the folders sitting in a folder answer to that folder", () => {
  const grouped = grouping({ "akasha/foo": ["akasha/foo/one", "akasha/foo/two"] })
  expect(answeringTo("akasha/foo", grouped, holding({}))).toEqual([
    "akasha/foo/one",
    "akasha/foo/two",
  ])
})

test("a part is looked through, so the folders in it answer to the folder above that part", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  const grouped = grouping({
    "akasha/foo": ["akasha/foo/modules"],
    "akasha/foo/modules": ["akasha/foo/modules/one"],
  })
  expect([...answeringTo("akasha/foo", grouped, holds)].sort()).toEqual([
    "akasha/foo/modules",
    "akasha/foo/modules/one",
  ])
  expect(namingFolderOf("akasha/foo/modules/one", holds)).toBe("akasha/foo")
})

test("a folder named `pages` the page in it names ends the descent", () => {
  const holds = holding({ "akasha/pages-system/pages": ["page", "pages"] })
  const grouped = grouping({
    "akasha/pages-system": ["akasha/pages-system/pages"],
    "akasha/pages-system/pages": ["akasha/pages-system/pages/address"],
  })
  expect(answeringTo("akasha/pages-system", grouped, holds)).toEqual(["akasha/pages-system/pages"])
})

test("a folder that is no part ends the descent, that folder naming the folders in it", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  const grouped = grouping({
    "akasha/foo": ["akasha/foo/other"],
    "akasha/foo/other": ["akasha/foo/other/deep"],
  })
  expect(answeringTo("akasha/foo", grouped, holds)).toEqual(["akasha/foo/other"])
  expect(namingFolderOf("akasha/foo/other/deep", holds)).toBe("akasha/foo/other")
})

test("a folder answering to a changed page is judged though no path inside it changed", () => {
  const holds = holding({ "akasha/foo": ["foo"] })
  const grouped = grouping({
    akasha: ["akasha/foo"],
    "akasha/foo": ["akasha/foo/foo-shapes", "akasha/foo/modules"],
    "akasha/foo/modules": ["akasha/foo/modules/deep"],
  })
  const said = foldersJudgedBy(
    change(["akasha/foo/foo.module.ts"], { "akasha/foo/foo.module.ts": "" }, {}),
    NAMING_NONE,
    grouped,
    holds
  )
  expect([...said].sort()).toEqual([
    "",
    "akasha",
    "akasha/foo",
    "akasha/foo/foo-shapes",
    "akasha/foo/modules",
    "akasha/foo/modules/deep",
  ])
})

test("the workspace root is judged, and no folder answers to it", () => {
  const holds = holding({})
  const grouped = grouping({ "": ["one", "two"] })
  const said = foldersJudgedBy(
    change(["one/one.module.ts"], { "one/one.module.ts": "" }, {}),
    NAMING_NONE,
    grouped,
    holds
  )
  expect([...said].sort()).toEqual(["", "one"])
})

test("a change carrying no path judges no folder at all", () => {
  const said = foldersJudgedBy(change([], {}, {}), NAMING_NONE, grouping({}), holding({}))
  expect([...said]).toEqual([])
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
  const parts = partsOver(paging(value), ROOT, new Map(), new Map(), FOLDER_PROPERTIES, () => false)
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

const HOLDER: Value = {
  pageTypeSlug: "book-section",
  slug: "beginnings",
  pluralSlug: "beginnings-parts",
  parts: ["book-section/two"],
}

test("the page in a folder is read by its path, so a scoped page states its plural and parts", () => {
  const holds = holdingOver(
    { pageByPath: (asked) => (asked === HOLDER_AT ? HOLDER : null) },
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
