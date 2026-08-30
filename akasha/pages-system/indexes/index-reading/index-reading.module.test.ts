import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { gitIn } from "../../../testing-system/gitting/gitting.module.code.ts"
import { stampKept } from "../index-stamp/index-stamp.module.code.ts"
import {
  everyPath,
  importersOf,
  indexAt,
  indexIn,
  readingIn,
  schemaOf,
  standingById,
  standingByPath,
} from "./index-reading.module.code.ts"
import {
  idFiled,
  importFiled,
  pathFiled,
  schemaFiled,
} from "./index-reading.module.test-fixtures.ts"

const A = "01a04bdd-0000-7000-8000-00000000000a"
const B = "01a04bdd-0000-7000-8000-00000000000b"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootAt(): string {
  return scratch.rootFor("akasha-reading-")
}

function committedAt(): string {
  const root = rootAt()
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@akasha"])
  gitIn(root, ["config", "user.name", "held"])
  writeFileSync(join(root, "held"), "held\n")
  gitIn(root, ["add", "--", "held"])
  gitIn(root, ["commit", "--quiet", "-m", "held", "--", "held"])
  return root
}

function stampedAt(): string {
  const root = committedAt()
  stampKept(indexIn(root), {
    commit: gitIn(root, ["rev-parse", "HEAD"]).trim(),
    tree: "akasha",
    settled: [],
  })
  return root
}

test("a path the index carries is answered with the page carrying it", () => {
  const root = rootAt()
  pathFiled(root, "akasha/a.module.code.ts", [{ path: "akasha/a.module.ts", id: A }])

  expect(standingByPath(root, "akasha/a.module.code.ts")).toEqual([
    { path: "akasha/a.module.ts", id: A },
  ])
})

test("a page's own path is answered with itself", () => {
  const root = rootAt()
  pathFiled(root, "akasha/a.module.ts", [{ path: "akasha/a.module.ts", id: A }])

  expect(standingByPath(root, "akasha/a.module.ts")).toEqual([
    { path: "akasha/a.module.ts", id: A },
  ])
})

test("a path no page carries is answered with nothing rather than by throwing", () => {
  const root = rootAt()

  expect(standingByPath(root, "akasha/nowhere.module.ts")).toEqual([])
})

test("a path two pages fall on is answered with both of them", () => {
  const root = rootAt()
  pathFiled(root, "x.module.code.ts", [
    { path: "x.module.code.ts", id: B },
    { path: "x.module.ts", id: A },
  ])

  expect(standingByPath(root, "x.module.code.ts").map((one) => one.id)).toEqual([B, A])
})

test("every path the index files is answered, however deep the folders it files them under", () => {
  const root = rootAt()
  pathFiled(root, "akasha/a.module.ts", [{ path: "akasha/a.module.ts", id: A }])
  pathFiled(root, "akasha/a.module.code.ts", [{ path: "akasha/a.module.ts", id: A }])
  pathFiled(root, "akasha/held/b.module.ts", [{ path: "akasha/held/b.module.ts", id: B }])

  expect(everyPath(root)).toEqual([
    "akasha/a.module.code.ts",
    "akasha/a.module.ts",
    "akasha/held/b.module.ts",
  ])
})

test("a path directory that is not there is answered with nothing, the caller saying what that means", () => {
  const root = rootAt()

  expect(everyPath(root)).toEqual([])
})

test("an id the index carries is answered with the page carrying it", () => {
  const root = rootAt()
  idFiled(root, A, [{ path: "akasha/a.module.ts", id: A }])

  expect(standingById(root, A)).toEqual({ path: "akasha/a.module.ts", id: A })
  expect(standingById(root, B)).toBe(null)
})

test("a relation property is answered with the shape it is and the page type it may name", () => {
  const root = rootAt()
  const held = {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "domain",
    unique: null,
    slug: "domain-slug",
    propertySlug: "domain-slug",
  }
  schemaFiled(root, "relation-property", "domain-slug", [held])

  expect(schemaOf(root, "domain-slug")).toEqual({ schema: held })
})

test("a property that names no page is answered with a shape that is not a relation", () => {
  const root = rootAt()
  const held = {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: null,
    slug: "definition",
    propertySlug: "definition",
  }
  schemaFiled(root, "text-property", "definition", [held])

  expect(schemaOf(root, "definition")).toEqual({ schema: held })
})

test("a property naming many pages is answered with the target it names itself", () => {
  const root = rootAt()
  const held = {
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "domain",
    unique: null,
    slug: "part-slugs",
    propertySlug: "part-slugs",
  }
  schemaFiled(root, "relation-property", "part-slugs", [held])

  expect(schemaOf(root, "part-slugs")).toEqual({ schema: held })
})

test("a name saying its page type reads that one file, and passes over another of the slug", () => {
  const root = rootAt()
  const text = {
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: null,
    slug: "foo",
    propertySlug: "foo",
  }
  const number = {
    pageTypeSlug: "number-property",
    targetPageTypeSlug: null,
    unique: null,
    slug: "foo",
    propertySlug: "foo",
  }
  schemaFiled(root, "text-property", "foo", [text])
  schemaFiled(root, "number-property", "foo", [number])

  expect(schemaOf(root, "number-property/foo")).toEqual({ schema: number })
})

test("a property the index does not carry is refused rather than answered as nothing", () => {
  const root = rootAt()

  expect(schemaOf(root, "nowhere")).toEqual({
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
  const root = stampedAt()
  importFiled(root, "akasha/a.module.code.ts", [
    { path: "akasha/two.module.code.ts" },
    { path: "akasha/one.module.code.ts" },
  ])

  expect(importersOf(root, "akasha/a.module.code.ts")).toEqual([
    "akasha/one.module.code.ts",
    "akasha/two.module.code.ts",
  ])
})

test("a path nothing imports is answered with nothing rather than by throwing", () => {
  const root = stampedAt()
  importFiled(root, "akasha/a.module.code.ts", [{ path: "akasha/one.module.code.ts" }])

  expect(importersOf(root, "akasha/nowhere.module.code.ts")).toEqual([])
})

test("what imports a file is refused when the import index is not there, no folder being no answer", () => {
  const root = stampedAt()

  expect(() => importersOf(root, "akasha/a.module.code.ts")).toThrow(/import\/path/)
})

test("what imports a file is refused when the index names no commit", () => {
  const root = committedAt()
  importFiled(root, "akasha/a.module.code.ts", [{ path: "akasha/one.module.code.ts" }])

  expect(() => importersOf(root, "akasha/a.module.code.ts")).toThrow(/names no commit/)
})

test("what imports a file is refused when a commit the index never saw stands", () => {
  const root = stampedAt()
  importFiled(root, "akasha/a.module.code.ts", [{ path: "akasha/one.module.code.ts" }])
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, "akasha", "late.ts"), "export const late = 1\n")
  gitIn(root, ["add", "--", "akasha/late.ts"])
  gitIn(root, ["commit", "--quiet", "-m", "late", "--", "akasha/late.ts"])

  expect(() => importersOf(root, "akasha/a.module.code.ts")).toThrow(/akasha\/late\.ts/)
})

test("an index's own place is answered under the index root", () => {
  expect(indexAt("held").startsWith(indexIn(""))).toBe(true)
  expect(indexAt("held", "page", "id")).toBe(`${indexAt("held")}/page/id`)
})

test("a reader answers alike whether it is given the root or a reading of the index", () => {
  const root = rootAt()
  pathFiled(root, "akasha/a.module.ts", [{ path: "akasha/a.module.ts", id: A }])

  expect(standingByPath(readingIn(root), "akasha/a.module.ts")).toEqual(
    standingByPath(root, "akasha/a.module.ts")
  )
})
