import { afterAll, expect, test } from "bun:test"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import {
  everyOfType,
  everyPath,
  importersOf,
  indexNamed,
  listedById,
  listedByPath,
  listedFor,
  listedWithin,
  readingIn,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  importFiled,
  listingFiled,
  noPathsFiled,
  nothingFiled,
  pathFiled,
  scopedFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { indexAt, indexIn } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const A = "01a04bdd-0000-7000-8000-00000000000a"
const B = "01a04bdd-0000-7000-8000-00000000000b"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootAt(): string {
  return scratch.rootFor("akasha-reading-")
}

test("a page an address names is answered under the page type that address states", () => {
  const root = rootAt()
  const held = { path: "akasha/one/one.workspace-package.ts", id: A }
  listedFiled(root, "workspace-package", "one", [held])

  expect(
    listedFor(root, { pageTypeSlug: "workspace-package", propertySlug: "slug", value: "one" })
  ).toEqual(held)
  expect(listedFor(root, { pageTypeSlug: "domain", propertySlug: "slug", value: "one" })).toBe(null)
})

test("a page filed under one property is not answered under another of the same type", () => {
  const root = rootAt()
  const held = { path: "akasha/one/one.domain.ts", id: A }
  listedFiled(root, "domain", "one", [held])

  expect(listedFor(root, { pageTypeSlug: "domain", propertySlug: "slug", value: "one" })).toEqual(
    held
  )
  expect(listedFor(root, { pageTypeSlug: "domain", propertySlug: "bundle-id", value: "one" })).toBe(
    null
  )
})

test("an address naming a page by its id is answered by that id", () => {
  const root = rootAt()
  const held = { path: "akasha/a.module.ts", id: A }
  idFiled(root, A, [held])

  expect(listedFor(root, { id: A })).toEqual(held)
})

test("a page unique within a scope is answered under the page type and then the scope", () => {
  const root = rootAt()
  const held = { path: "akasha/inn/chapter-1.story-chapter-read.ts", id: A }
  scopedFiled(root, "story-chapter-read", "story-read-slug", "the-wandering-inn", "chapter-1", [
    held,
  ])

  expect(
    listedFor(root, {
      pageTypeSlug: "story-chapter-read",
      scopePropertySlug: "story-read-slug",
      scopeValue: "the-wandering-inn",
      propertySlug: "slug",
      value: "chapter-1",
    })
  ).toEqual(held)
})

test("a page carrying that value in another scope is not the page answered", () => {
  const root = rootAt()
  scopedFiled(root, "story-chapter-read", "story-read-slug", "the-wandering-inn", "chapter-1", [
    { path: "akasha/inn/chapter-1.story-chapter-read.ts", id: A },
  ])

  expect(
    listedFor(root, {
      pageTypeSlug: "story-chapter-read",
      scopePropertySlug: "story-read-slug",
      scopeValue: "the-last-orellia",
      propertySlug: "slug",
      value: "chapter-1",
    })
  ).toBe(null)
})

test("a scope named on its own is answered without an address being composed", () => {
  const root = rootAt()
  const held = { path: "akasha/inn/chapter-1.story-chapter-read.ts", id: A }
  scopedFiled(root, "story-chapter-read", "story-read-slug", "the-wandering-inn", "chapter-1", [
    held,
  ])

  expect(
    listedWithin(
      root,
      "story-chapter-read",
      "story-read-slug",
      "the-wandering-inn",
      "slug",
      "chapter-1"
    )
  ).toEqual([held])
})

test("a path the index carries is answered with the page carrying it", () => {
  const root = rootAt()
  pathFiled(root, "akasha/a.module.code.ts", [{ path: "akasha/a.module.ts", id: A }])

  expect(listedByPath(root, "akasha/a.module.code.ts")).toEqual([
    { path: "akasha/a.module.ts", id: A },
  ])
})

test("a page's own path is answered with itself", () => {
  const root = rootAt()
  pathFiled(root, "akasha/a.module.ts", [{ path: "akasha/a.module.ts", id: A }])

  expect(listedByPath(root, "akasha/a.module.ts")).toEqual([{ path: "akasha/a.module.ts", id: A }])
})

test("a path no page carries is answered with nothing rather than by throwing", () => {
  const root = rootAt()
  noPathsFiled(root)

  expect(listedByPath(root, "akasha/nowhere.module.ts")).toEqual([])
})

test("a path two pages fall on is answered with both of them", () => {
  const root = rootAt()
  pathFiled(root, "x.module.code.ts", [
    { path: "x.module.code.ts", id: B },
    { path: "x.module.ts", id: A },
  ])

  expect(listedByPath(root, "x.module.code.ts").map((one) => one.id)).toEqual([B, A])
})

test("every path the index files is answered as the lines of the one file holding them", () => {
  const root = rootAt()
  const held = ["akasha/a.module.code.ts", "akasha/a.module.ts", "akasha/held/b.module.ts"]
  listingFiled(root, held)

  expect(everyPath(root)).toEqual(held)
})

test("those paths come back in the order they were filed rather than sorted again", () => {
  const root = rootAt()
  const held = ["b.module.ts", "a.module.ts"]
  listingFiled(root, held)

  expect(everyPath(root)).toEqual(held)
})

test("an index that is there filing no listing is answered with no path rather than refused", () => {
  const root = rootAt()
  nothingFiled(root)

  expect(everyPath(root)).toEqual([])
})

test("an id the index carries is answered with the page carrying it", () => {
  const root = rootAt()
  idFiled(root, A, [{ path: "akasha/a.module.ts", id: A }])

  expect(listedById(root, A)).toEqual({ path: "akasha/a.module.ts", id: A })
  expect(listedById(root, B)).toBe(null)
})

test("an id directory standing nowhere under a standing index is nothing rather than a refusal", () => {
  const root = rootAt()
  nothingFiled(root)

  expect(listedById(root, A)).toBe(null)
})

test("every reader is refused where the index stands nowhere, whatever it was asked", () => {
  const root = rootAt()

  expect(() => listedById(root, A)).toThrow(indexNamed())
  expect(() => listedById(root, A)).toThrow(/is not an index naming none/)
  expect(() => everyPath(root)).toThrow(/is not an index naming none/)
  expect(() => listedByPath(root, "akasha/a.module.ts")).toThrow(/is not an index naming none/)
})

test("a refusal names the directory the reading read from rather than a path under a root", () => {
  const root = rootAt()

  expect(() => listedById(root, A)).toThrow(indexIn(root))
})

test("a path the index carries edges for is answered with every file importing it", () => {
  const root = rootAt()
  importFiled(root, "akasha/a.module.code.ts", [
    { path: "akasha/two.module.code.ts" },
    { path: "akasha/one.module.code.ts" },
  ])

  expect(importersOf("akasha/a.module.code.ts", readingIn(root))).toEqual([
    "akasha/one.module.code.ts",
    "akasha/two.module.code.ts",
  ])
})

test("a path nothing imports is answered with nothing rather than by throwing", () => {
  const root = rootAt()
  importFiled(root, "akasha/a.module.code.ts", [{ path: "akasha/one.module.code.ts" }])

  expect(importersOf("akasha/nowhere.module.code.ts", readingIn(root))).toEqual([])
})

test("what imports a file is nothing where the import tree is missing beneath the index", () => {
  const root = rootAt()
  nothingFiled(root)

  expect(importersOf("akasha/a.module.code.ts", readingIn(root))).toEqual([])
})

test("what imports a file is refused where the index itself is not there", () => {
  const root = rootAt()

  expect(() => importersOf("akasha/a.module.code.ts", readingIn(root))).toThrow(
    /is not an index naming none/
  )
})

test("an index's own place is answered under the index root", () => {
  expect(indexAt("held").startsWith(indexIn(""))).toBe(true)
  expect(indexAt("held", "page", "id")).toBe(`${indexAt("held")}/page/id`)
})

test("a reader answers alike whether it is given the root or a reading of the index", () => {
  const root = rootAt()
  pathFiled(root, "akasha/a.module.ts", [{ path: "akasha/a.module.ts", id: A }])

  expect(listedByPath(readingIn(root), "akasha/a.module.ts")).toEqual(
    listedByPath(root, "akasha/a.module.ts")
  )
})

test("every page of one page type is answered from the slugs filed under that page type", () => {
  const root = rootAt()
  const one = { path: "akasha/one/one.module.ts", id: A }
  const two = { path: "akasha/held/two.module.ts", id: B }
  listedFiled(root, "module", "one", [one])
  listedFiled(root, "module", "two", [two])

  expect(everyOfType(root, "module")).toEqual([two, one])
})

test("a page type whose slug is unique within a scope is answered from every scope's folder", () => {
  const root = rootAt()
  const one = { path: "akasha/a/one.section.ts", id: A }
  const two = { path: "akasha/b/two.section.ts", id: B }
  scopedFiled(root, "section", "section-of", "first", "one", [one])
  scopedFiled(root, "section", "section-of", "second", "two", [two])

  expect(everyOfType(root, "section")).toEqual([one, two])
})

test("a page the values name and no slug names is answered by nothing", () => {
  const root = rootAt()
  valueAlsoFiled(root, "module", [
    { path: "akasha/one/one.module.ts", value: { id: A, pageTypeSlug: "module", slug: "one" } },
  ])

  expect(everyOfType(root, "module")).toEqual([])
})
