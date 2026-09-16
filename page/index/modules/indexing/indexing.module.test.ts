import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { everyFileUnder } from "akasha/check/test/fixture/walking/walking.test-fixture.code.ts"
import {
  indexingAt,
  refreshedFrom,
} from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import {
  A,
  A_WITH_CODE,
  aFileHeldNotLoaded,
  aRefreshBlocked,
  aSource,
  aTarget,
  aWorldDeclaringNothing,
  aWorldDeclaringNoUnique,
  aWorldWithAFileGone,
  aWorldWithAnEdge,
  aWorldWithOnePage,
  B,
  bare,
  C,
  D,
  grounded,
  idFile,
  linesIn,
  NAMES_C_BY_ID,
  NAMES_C_BY_SLUG,
  NOTE,
  namesIn,
  namingAType,
  noteShaped,
  pathBlocked,
  pathsFiledIn,
  renamed,
  retyped,
  said,
  settled,
  shapeFiled,
  slugFile,
  TYPE_SLUG,
  tookAway,
  untouchedAfter,
  worldsApart,
  wrotePages,
} from "akasha/page/index/modules/indexing/indexing.module.test-fixtures.ts"
import type { Settling } from "akasha/page/index/modules/settling/index-settling.module.code.ts"
import { readingNone } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  aProperty,
  aType,
  bodyOf,
  butTheStamp,
  put,
  scratch,
  thePage,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep, 5000)

test("a written page is answered by its id and by its page type and slug", () => {
  const { tree, root } = bare()
  const at = settled(root, tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "a" }, null)
  const found = { path: relative(tree, at), id: A }

  expect(said(idFile(root, A))).toEqual(found)
  expect(said(slugFile(root, "domain", "a"))).toEqual(found)
})

test("a renamed slug withdraws its old entry and leaves the id entry untouched", () => {
  const { tree, root } = bare()
  const was = { id: A, pageTypeSlug: "domain", slug: "a" }
  settled(root, tree, "a.domain.ts", was, null)
  settled(root, tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "renamed" }, was)

  expect(existsSync(slugFile(root, "domain", "a"))).toBe(false)
  expect(existsSync(slugFile(root, "domain", "renamed"))).toBe(true)
  expect(existsSync(idFile(root, A))).toBe(true)
})

test("a removed page leaves no entry and no empty directory", () => {
  const { tree, root } = bare()
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const at = settled(root, tree, "a.domain.ts", value, null)
  tookAway(root, tree, at, bodyOf(value))

  expect(existsSync(idFile(root, A))).toBe(false)
  expect(existsSync(slugFile(root, "domain", "a"))).toBe(false)
  expect(existsSync(join(root, "page-type", "domain"))).toBe(false)
})

test("two pages carrying one value leave two lines in one file", () => {
  const { tree, root } = grounded()
  settled(root, tree, "one.domain.ts", { id: A, pageTypeSlug: "domain", slug: "same" }, null)
  settled(root, tree, "two.domain.ts", { id: B, pageTypeSlug: "domain", slug: "same" }, null)

  expect(linesIn(slugFile(root, "domain", "same")).length).toBe(2)
})

test("a property that changes its shape changes what its entry says and where it is filed", () => {
  const { tree, root } = grounded()
  const at = settled(root, tree, ...NOTE, null)
  expect(shapeFiled(root, tree, "relation-property", "note")).toEqual(
    noteShaped("relation-property", "domain")
  )

  tookAway(root, tree, at, bodyOf(NOTE[1]))
  settled(root, tree, ...aProperty("8", "note", "text-property"), null)

  expect(shapeFiled(root, tree, "relation-property", "note")).toBe(null)
  expect(shapeFiled(root, tree, "text-property", "note")).toEqual(noteShaped("text-property", null))
})

test("a removed property leaves no shape of its own and leaves the rest in place", () => {
  const { tree, root } = grounded()
  const at = settled(root, tree, ...NOTE, null)
  tookAway(root, tree, at, bodyOf(NOTE[1]))

  expect(shapeFiled(root, tree, "relation-property", "note")).toBe(null)
  expect(shapeFiled(root, tree, "relation-property", "part-slugs")).not.toBe(null)
})

test("a value naming its page type is filed under the target's id", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }
  const at = settled(root, tree, "a.domain.ts", value, null)

  expect(namesIn(root, tree, B, "part-slugs", A)).toEqual([relative(tree, at)])
})

test("a name reaching a page type the settle adds is filed, then and later", () => {
  const { tree, root } = grounded()
  wrotePages(root, tree, [TYPE_SLUG])

  expect(wrotePages(root, tree, [aType(D, "probe", ["page"]), namingAType("probe")])).toEqual([])
  expect(namesIn(root, tree, D, "type-slug", A)).not.toEqual([])
  expect(wrotePages(root, tree, [namingAType("probe")])).toEqual([])
  expect(wrotePages(root, tree, [namingAType("gone")]).join(" ")).toMatch(/slug `gone`/)
})

test("a bare value reaches a page type extending the one its property names", () => {
  const { tree, root } = grounded()
  settled(root, tree, "a.domain.ts", NAMES_C_BY_SLUG, null)

  expect(namesIn(root, tree, C, "part-slugs", A)).not.toEqual([])
})

test("a retargeted value withdraws the edge it left", () => {
  const { tree, root } = grounded()
  const was = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }
  settled(root, tree, "a.domain.ts", was, null)
  settled(root, tree, "a.domain.ts", NAMES_C_BY_ID, was)

  expect(namesIn(root, tree, B, "part-slugs", A)).toEqual([])
  expect(namesIn(root, tree, C, "part-slugs", A)).not.toEqual([])
})

test("renaming a page and the page naming it by slug leaves no line for where it was", () => {
  const { tree, root } = grounded()
  expect(wrotePages(root, tree, [aTarget("was"), aSource("from", "was")])).toEqual([])
  expect(namesIn(root, tree, D, "part-slugs", A)).toEqual(["from.domain.ts"])

  renamed(root, tree, [
    ["was.domain.ts", aTarget("now")],
    ["from.domain.ts", aSource("to", "now")],
  ])

  expect(namesIn(root, tree, D, "part-slugs", A)).toEqual(["to.domain.ts"])
})

test("a page moved on its own keeps one edge naming where it moved to", () => {
  const { tree, root } = grounded()
  expect(wrotePages(root, tree, [aSource("from", "b")])).toEqual([])
  expect(namesIn(root, tree, B, "part-slugs", A)).toEqual(["from.domain.ts"])

  expect(renamed(root, tree, [["from.domain.ts", aSource("to", "b")]])).toEqual([])

  expect(namesIn(root, tree, B, "part-slugs", A)).toEqual(["to.domain.ts"])
})

test("a value the change withdraws that would not resolve before it is reported", () => {
  const { tree, root } = grounded()
  expect(wrotePages(root, tree, [aSource("from", "ghost")]).join(" ")).toMatch(/slug `ghost`/)

  expect(renamed(root, tree, [["from.domain.ts", aSource("to", "b")]]).join(" ")).toMatch(
    /slug `ghost`/
  )
})

test("a page type renamed in the same change withdraws the edge a bare value left", () => {
  const { tree, root } = grounded()
  const d = thePage({ id: D, pageTypeSlug: "domain", slug: "d", domainSlug: "c" })
  expect(wrotePages(root, tree, [d])).toEqual([])
  expect(namesIn(root, tree, C, "domain-slug", D)).toEqual(["d.domain.ts"])

  retyped(root, tree, "module.page-type.ts", "unit.page-type.ts", ["d.domain.ts"])

  expect(namesIn(root, tree, C, "domain-slug", D)).toEqual([])
})

test("a bare value narrowing to more than one page is refused rather than resolved", () => {
  const { tree, root } = grounded()
  settled(root, tree, "b.module.ts", { id: D, pageTypeSlug: "module", slug: "b" }, null)
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["b"] }
  const indexing = indexingAt(root, tree)
  indexing.wrote(put(tree, "a.domain.ts", bodyOf(value)), bodyOf(value), null)

  expect(indexing.settle().join(" ")).toMatch(/narrows to 2 pages/)
  expect(namesIn(root, tree, B, "part-slugs", A)).toEqual([])
})

test("a refresh from the pages agrees with the index a write left", () => {
  const { landed, rebuilt, tree } = worldsApart()
  expect(namesIn(landed, tree, B, "part-slugs", A)).not.toEqual([])
  expect(butTheStamp(everyFileUnder(rebuilt))).toEqual(butTheStamp(everyFileUnder(landed)))
})

test("pages carrying no property that declares a unique are refused rather than filed empty", () => {
  const { tree, root } = aWorldDeclaringNoUnique()

  expect(() => refreshedFrom(tree, root, tree)).toThrow("no property carrying a `unique`")
})

test("a settle into an index that has filed nothing yet refuses no page the pages declare", () => {
  const { tree, root } = aWorldWithAnEdge()
  const value = { id: D, pageTypeSlug: "domain", slug: "d" }
  const body = bodyOf(value)
  const indexing = indexingAt(root, tree)
  indexing.wrote(put(tree, "d.domain.ts", body), body, null)

  expect(indexing.settle()).toEqual([])
})

test("a world carrying a page and declaring no property at all is refused", () => {
  const { tree, root } = aWorldDeclaringNothing()

  expect(() => refreshedFrom(tree, root, tree)).toThrow("no property carrying a `unique`")
})

test("a refresh that threw names the stages it finished and the file it had in hand", () => {
  const { tree, root } = aWorldWithAnEdge()
  pathBlocked(root, tree)
  const done: string[] = []

  expect(() => refreshedFrom(tree, root, tree, true, done)).toThrow()

  expect(done[0] ?? "").toMatch(/^page — \d+ files? written$/)
  expect(done[done.length - 1] ?? "").toMatch(/^deep — \d+ files? written, `\S+` in hand$/)
})

test("a refresh passes over a file gone before its body is read", () => {
  const { tree, root } = aWorldWithAFileGone()

  refreshedFrom(tree, root, tree)

  expect(existsSync(idFile(root, A))).toBe(true)
})

test("a refresh takes away an entry no page carries", () => {
  const { tree, root } = aWorldWithOnePage()
  refreshedFrom(tree, root, tree)

  const stale = slugFile(root, "domain", "gone")
  mkdirSync(dirname(stale), { recursive: true })
  writeFileSync(stale, `${JSON.stringify({ path: "nowhere", id: C })}\n`)
  refreshedFrom(tree, root, tree)

  expect(existsSync(stale)).toBe(false)
  expect(existsSync(slugFile(root, "domain", "a"))).toBe(true)
})

test("a file a page property holds is not loaded, so it is neither run nor read as a page", () => {
  const { indexing, root, ran } = aFileHeldNotLoaded()

  expect(indexing.settle()).toEqual([])
  expect(existsSync(ran)).toBe(false)
  expect(existsSync(idFile(root, D))).toBe(false)
})

test("a settle handed what a settle worked out already writes that rather than working it out again", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const body = bodyOf(value)
  const handed: Settling = {
    reading: readingNone(),
    filings: [
      {
        at: "page/id/handed.jsonl",
        came: [JSON.stringify({ path: "a.domain.ts", id: A })],
        went: [],
      },
    ],
    references: [],
    carried: new Map(),
    beside: new Map(),
    noted: [],
    refusedBefore: [],
    refused: [],
  }
  const indexing = indexingAt(root, tree, handed)
  indexing.wrote(put(tree, "a.domain.ts", body), body, null)

  expect(indexing.settle()).toEqual([])
  expect(existsSync(join(root, "page", "id", "handed.jsonl"))).toBe(true)
  expect(existsSync(idFile(root, A))).toBe(false)
})

test("a page whose body will not load is reported rather than passed over", () => {
  const { tree, root } = grounded()

  const indexing = indexingAt(root, tree)
  indexing.wrote(join(tree, "broken.domain.ts"), "the new body", null)

  const noted = indexing.settle()
  expect(noted.length).toBe(1)
  expect(noted[0] ?? "").toMatch(/did not load/)
})

test("a path the index stores is relative to the repository root", () => {
  const { tree, root } = grounded()
  settled(root, tree, "deep/a.module.ts", A_WITH_CODE, null)

  const held = pathsFiledIn(root)
  expect(held.length).toBeGreaterThan(0)
  for (const one of held) expect(one.startsWith("/")).toBe(false)
})

test("a unique kind respelled to the scope it already named files nothing for a page left alone", () => {
  expect(untouchedAfter("page")).toBe(false)
  expect(untouchedAfter("page-type")).toBe(true)
})

test("a refresh that stopped part way leaves an index every reader still reads", () => {
  const { tree, root } = aRefreshBlocked()

  expect(() => refreshedFrom(tree, root, tree)).toThrow()

  expect(existsSync(idFile(root, A))).toBe(true)
})

test("a refresh names the shapes file it wrote and leaves it alone once it says that", () => {
  const { tree, root } = aWorldWithAnEdge()
  const at = "text-property.page-type.shapes.jsonl"
  rmSync(join(tree, at))

  expect(refreshedFrom(tree, root, tree).beside).toEqual([at])

  expect(refreshedFrom(tree, root, tree).beside).toEqual([])
})
