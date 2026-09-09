import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { indexAt, indexIn } from "../surface/index-surface.module.code.ts"
import {
  everyOfType,
  everyPath,
  importersOf,
  listedById,
  listedByPath,
  listedFor,
  listedWithin,
  readingIn,
  schemaOf,
} from "./index-reading.module.code.ts"
import {
  idFiled,
  importFiled,
  listedFiled,
  listingFiled,
  noPathsFiled,
  nothingFiled,
  pathFiled,
  schemaFiled,
  scopedFiled,
  valueAlsoFiled,
} from "./index-reading.module.test-fixtures.ts"

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

  expect(() => listedById(root, A)).toThrow(/\.git\/data\/index/)
  expect(() => listedById(root, A)).toThrow(/is not an index naming none/)
  expect(() => everyPath(root)).toThrow(/is not an index naming none/)
  expect(() => listedByPath(root, "akasha/a.module.ts")).toThrow(/is not an index naming none/)
  expect(() => schemaOf(root, "text-property/nowhere")).toThrow(/is not an index naming none/)
})

test("a relation property is answered with the shape it is and the page type it may name", () => {
  const root = rootAt()
  const held = {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "domain",
    unique: null,
    uniquePropertySlug: null,
    slug: "page-domain",
    propertySlug: "domain",
    fileName: null,
    folderName: null,
  }
  schemaFiled(root, "relation-property", "page-domain", [held])

  expect(schemaOf(root, "relation-property/page-domain")).toEqual({ schema: held })
})

test("a property that names no page is answered with a shape that is not a relation", () => {
  const root = rootAt()
  const held = {
    pageTypeSlug: "standard-agent-english-property",
    targetPageTypeSlug: null,
    unique: null,
    uniquePropertySlug: null,
    slug: "definition",
    propertySlug: "definition",
    fileName: null,
    folderName: null,
  }
  schemaFiled(root, "standard-agent-english-property", "definition", [held])

  expect(schemaOf(root, "standard-agent-english-property/definition")).toEqual({ schema: held })
})

test("a property naming many pages is answered with the target it names itself", () => {
  const root = rootAt()
  const held = {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "domain",
    unique: null,
    uniquePropertySlug: null,
    slug: "part-slugs",
    propertySlug: "part-slugs",
    fileName: null,
    folderName: null,
  }
  schemaFiled(root, "relation-property", "part-slugs", [held])

  expect(schemaOf(root, "relation-property/part-slugs")).toEqual({ schema: held })
})

test("a name saying its page type reads that one file, and passes over another of the slug", () => {
  const root = rootAt()
  const text = {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: null,
    uniquePropertySlug: null,
    slug: "foo",
    propertySlug: "foo",
    fileName: null,
    folderName: null,
  }
  const number = {
    pageTypeSlug: "number-property",
    targetPageTypeSlug: null,
    unique: null,
    uniquePropertySlug: null,
    slug: "foo",
    propertySlug: "foo",
    fileName: null,
    folderName: null,
  }
  schemaFiled(root, "text-property", "foo", [text])
  schemaFiled(root, "number-property", "foo", [number])

  expect(schemaOf(root, "number-property/foo")).toEqual({ schema: number })
})

test("a property the index does not carry is refused rather than answered as nothing", () => {
  const root = rootAt()
  nothingFiled(root)

  expect(schemaOf(root, "text-property/nowhere")).toEqual({
    refused: "no page property carries the slug `nowhere`",
  })
})

test("a page type carrying no property of the slug is refused as well", () => {
  const root = rootAt()
  schemaFiled(root, "text-property", "foo", [
    { pageTypeSlug: "text-property", targetPageTypeSlug: null },
  ])

  expect(schemaOf(root, "number-property/foo")).toEqual({
    refused: "no page property carries the slug `foo`",
  })
})

test("a bare slug one page type carries is searched for and answered with that shape", () => {
  const root = rootAt()
  const held = {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: null,
    uniquePropertySlug: null,
    slug: "foo",
    propertySlug: "foo",
    fileName: null,
    folderName: null,
  }
  schemaFiled(root, "text-property", "foo", [held])

  expect(schemaOf(root, "foo")).toEqual({ schema: held })
})

test("a bare slug two page types carry is refused and must name its page type", () => {
  const root = rootAt()
  schemaFiled(root, "text-property", "foo", [
    { pageTypeSlug: "text-property", targetPageTypeSlug: null },
  ])
  schemaFiled(root, "number-property", "foo", [
    { pageTypeSlug: "number-property", targetPageTypeSlug: null },
  ])

  expect(schemaOf(root, "foo")).toEqual({
    refused:
      "`foo` narrows to 2 page properties and must name its page type — " +
      "number-property/foo, text-property/foo",
  })
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

test("every page of one page type is answered from the values filed under that page type", () => {
  const root = rootAt()
  const one = { path: "akasha/one/one.module.ts", id: A }
  const two = { path: "akasha/held/two.module.ts", id: B }
  valueAlsoFiled(root, "module", [
    { path: one.path, value: { id: A, pageTypeSlug: "module", slug: "one" } },
    { path: two.path, value: { id: B, pageTypeSlug: "module", slug: "two" } },
  ])

  expect(everyOfType(root, "module")).toEqual([two, one])
})

test("a page filed under its slug alone is answered by nothing, the values being read instead", () => {
  const root = rootAt()
  listedFiled(root, "module", "one", [{ path: "akasha/one/one.module.ts", id: A }])

  expect(everyOfType(root, "module")).toEqual([])
})

test("a value carrying no id is left out rather than answered under an id it does not carry", () => {
  const root = rootAt()
  valueAlsoFiled(root, "module", [
    { path: "akasha/one/one.module.ts", value: { pageTypeSlug: "module", slug: "one" } },
    { path: "akasha/two/two.module.ts", value: { id: B, pageTypeSlug: "module", slug: "two" } },
  ])

  expect(everyOfType(root, "module")).toEqual([{ path: "akasha/two/two.module.ts", id: B }])
})
