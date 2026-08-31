import { afterAll, expect, test } from "bun:test"
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { rootOf } from "../../../command-system/rooting/rooting.module.code.ts"
import { everyFileUnder } from "../../../testing-system/walking/walking.module.code.ts"
import { indexingAt, rebuiltFrom } from "./indexing.module.code.ts"
import {
  A,
  aProperty,
  aType,
  B,
  bare,
  bodyOf,
  butTheStamp,
  C,
  D,
  edgeFile,
  grounded,
  heldAt,
  IMPORTS,
  IMPORTS_AT,
  idFile,
  importFile,
  linesIn,
  type Named,
  NOTE,
  pathFile,
  put,
  renamed,
  said,
  schemaFile,
  scratch,
  settled,
  slugFile,
  stood,
  thePage,
  tookAway,
  VOCABULARY,
  wroteText,
} from "./indexing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a written page is answered by its id, by its page type and slug, and by its own path", () => {
  const { tree, root } = bare()
  const at = settled(root, tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "a" }, null)
  const found = { path: relative(tree, at), id: A }

  expect(said(idFile(root, A))).toEqual(found)
  expect(said(slugFile(root, "domain", "a"))).toEqual(found)
  expect(said(pathFile(root, "a.domain.ts"))).toEqual(found)
  expect(existsSync(pathFile(root, "a.domain.code.ts"))).toBe(false)
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
  expect(existsSync(join(root, "identity", "domain"))).toBe(false)
})

test("a property held in a file is answered by the page stating it", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  settled(root, tree, "deep/a.module.ts", value, null)
  const found = { path: "deep/a.module.ts", id: A }

  expect(said(pathFile(root, "deep/a.module.ts"))).toEqual(found)
  expect(said(pathFile(root, "deep/a.module.code.ts"))).toEqual(found)
  expect(said(pathFile(root, "deep/a.module.test.ts"))).toEqual(found)
})

test("a page whose code is taken away loses that path and keeps the rest", () => {
  const { tree, root } = grounded()
  const was = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  settled(root, tree, "a.module.ts", was, null)
  expect(existsSync(pathFile(root, "a.module.code.ts"))).toBe(true)

  settled(root, tree, "a.module.ts", { id: A, pageTypeSlug: "module", slug: "a", test: "ts" }, was)

  expect(existsSync(pathFile(root, "a.module.code.ts"))).toBe(false)
  expect(existsSync(pathFile(root, "a.module.test.ts"))).toBe(true)
  expect(existsSync(pathFile(root, "a.module.ts"))).toBe(true)
})

test("a removed page takes away the path of its own file and of every file it held", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }
  const at = settled(root, tree, "deep/a.module.ts", value, null)
  tookAway(root, tree, at, bodyOf(value))

  expect(existsSync(pathFile(root, "deep/a.module.ts"))).toBe(false)
  expect(existsSync(pathFile(root, "deep/a.module.code.ts"))).toBe(false)
  expect(existsSync(join(root, "path", "deep"))).toBe(false)
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
  expect(said(schemaFile(root, "relation-property", "note"))).toEqual({
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "domain",
    unique: null,
    slug: "note",
    propertySlug: "note",
  })

  tookAway(root, tree, at, bodyOf(NOTE[1]))
  settled(root, tree, ...aProperty("8", "note", "text-property"), null)

  expect(existsSync(schemaFile(root, "relation-property", "note"))).toBe(false)
  expect(said(schemaFile(root, "text-property", "note"))).toEqual({
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
    unique: null,
    slug: "note",
    propertySlug: "note",
  })
})

test("a removed property leaves no schema entry and leaves the rest standing", () => {
  const { tree, root } = grounded()
  const at = settled(root, tree, ...NOTE, null)
  tookAway(root, tree, at, bodyOf(NOTE[1]))

  expect(existsSync(schemaFile(root, "relation-property", "note"))).toBe(false)
  expect(existsSync(schemaFile(root, "relation-property", "part-slugs"))).toBe(true)
})

test("a value naming its page type is filed under the target's id", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }
  const at = settled(root, tree, "a.domain.ts", value, null)

  expect(said(edgeFile(root, B, "part-slugs", A))).toEqual({ path: relative(tree, at) })
})

test("a bare value reaches a page type extending the one its property names", () => {
  const { tree, root } = grounded()
  settled(
    root,
    tree,
    "a.domain.ts",
    { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["c"] },
    null
  )

  expect(existsSync(edgeFile(root, C, "part-slugs", A))).toBe(true)
})

test("a retargeted value withdraws the edge it left", () => {
  const { tree, root } = grounded()
  const was = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }
  settled(root, tree, "a.domain.ts", was, null)
  settled(
    root,
    tree,
    "a.domain.ts",
    { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: [C] },
    was
  )

  expect(existsSync(edgeFile(root, B, "part-slugs", A))).toBe(false)
  expect(existsSync(edgeFile(root, C, "part-slugs", A))).toBe(true)
})

const aTarget = (slug: string): Named => thePage({ id: D, pageTypeSlug: "domain", slug })

const aSource = (slug: string, names: string): Named =>
  thePage({ id: A, pageTypeSlug: "domain", slug, partSlugs: [`domain/${names}`] })

test("renaming a page and the page naming it by slug leaves no line for where it was", () => {
  const { tree, root } = grounded()
  expect(stood(root, tree, [aTarget("was"), aSource("from", "was")])).toEqual([])
  const edge = edgeFile(root, D, "part-slugs", A)
  expect(linesIn(edge)).toEqual(['{"path":"from.domain.ts"}'])

  renamed(root, tree, [
    ["was.domain.ts", aTarget("now")],
    ["from.domain.ts", aSource("to", "now")],
  ])

  expect(linesIn(edge)).toEqual(['{"path":"to.domain.ts"}'])
})

test("a page moved on its own keeps one edge naming where it moved to", () => {
  const { tree, root } = grounded()
  expect(stood(root, tree, [aSource("from", "b")])).toEqual([])
  const edge = edgeFile(root, B, "part-slugs", A)
  expect(linesIn(edge)).toEqual(['{"path":"from.domain.ts"}'])

  expect(renamed(root, tree, [["from.domain.ts", aSource("to", "b")]])).toEqual([])

  expect(linesIn(edge)).toEqual(['{"path":"to.domain.ts"}'])
})

test("a value the change withdraws that would not resolve before it is reported", () => {
  const { tree, root } = grounded()
  expect(stood(root, tree, [aSource("from", "ghost")]).join(" ")).toMatch(/slug `ghost`/)

  expect(renamed(root, tree, [["from.domain.ts", aSource("to", "b")]]).join(" ")).toMatch(
    /slug `ghost`/
  )
})

test("a bare value narrowing to more than one page is refused rather than resolved", () => {
  const { tree, root } = grounded()
  settled(root, tree, "b.module.ts", { id: D, pageTypeSlug: "module", slug: "b" }, null)
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["b"] }
  const indexing = indexingAt(root, tree)
  indexing.wrote(put(tree, "a.domain.ts", bodyOf(value)), bodyOf(value), null)

  expect(indexing.settle().join(" ")).toMatch(/narrows to 2 pages/)
  expect(existsSync(edgeFile(root, B, "part-slugs", A))).toBe(false)
})

test("a rebuild from the pages agrees with the index a write left", () => {
  const { tree, root: landed } = bare()
  const indexing = indexingAt(landed, tree)
  for (const [at, value] of VOCABULARY)
    indexing.wrote(put(tree, at, bodyOf(value)), bodyOf(value), null)
  const b = { id: B, pageTypeSlug: "domain", slug: "b" }
  const a = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", partSlugs: ["domain/b"] }
  indexing.wrote(put(tree, "b.domain.ts", bodyOf(b)), bodyOf(b), null)
  indexing.wrote(put(tree, "deep/a.module.ts", bodyOf(a)), bodyOf(a), null)
  const seen = 'import { a } from "./a.module.ts"\n'
  indexing.wrote(put(tree, "deep/a.module.code.ts", seen), seen, null)
  indexing.settle()
  expect(existsSync(importFile(landed, "deep/a.module.ts"))).toBe(true)

  const rebuilt = heldAt()
  rebuiltFrom(tree, rebuilt, tree)

  expect(existsSync(pathFile(landed, "deep/a.module.code.ts"))).toBe(true)
  expect(everyFileUnder(rebuilt)).toEqual(everyFileUnder(landed))
})

const CORPUS = join(rootOf(import.meta.dir), "akasha")

function everyBodyUnder(at: string): readonly string[] {
  const found: string[] = []
  const walk = (here: string): undefined => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const next = join(here, one.name)
      if (one.isDirectory()) walk(next)
      else if (one.name.endsWith(".ts")) found.push(next)
    }
  }
  walk(at)
  return found
}

test("a rebuild of the corpus and a settle over it leave the same index", () => {
  const repo = heldAt()
  const tree = join(repo, "akasha")
  cpSync(CORPUS, tree, { recursive: true })

  const built = heldAt()
  const said = rebuiltFrom(tree, built, repo)
  expect(said.pages).toBeGreaterThan(0)
  expect(said.refused).toEqual([])

  const kept = heldAt()
  const indexing = indexingAt(kept, repo)
  for (const path of everyBodyUnder(tree)) indexing.wrote(path, readFileSync(path, "utf8"), null)
  expect(indexing.settle()).toEqual([])

  expect(butTheStamp(everyFileUnder(kept))).toEqual(butTheStamp(everyFileUnder(built)))
})

test("pages carrying no property that declares a unique are refused rather than filed empty", () => {
  const tree = heldAt()
  const root = heldAt()
  for (const [at, value] of [
    aType("9", "text-property", "page-property"),
    aProperty("8", "note", "text-property"),
  ])
    put(tree, at, bodyOf(value))

  expect(() => rebuiltFrom(tree, root, tree)).toThrow("no property carrying a `unique`")
})

test("a settle over pages declaring no unique is refused rather than filed empty", () => {
  const tree = heldAt()
  const root = heldAt()
  const indexing = indexingAt(root, tree)
  const [at, value] = aProperty("8", "note", "text-property")
  const body = bodyOf(value)
  indexing.wrote(put(tree, at, body), body, null)

  expect(() => indexing.settle()).toThrow("no property carrying a `unique`")
})

test("a world carrying a page and declaring no property at all is refused", () => {
  const tree = heldAt()
  const root = heldAt()
  put(tree, "domain.page-type.ts", bodyOf(aType("1", "domain", "page")[1]))
  put(tree, "a.domain.ts", bodyOf({ id: A, pageTypeSlug: "domain", slug: "a" }))

  expect(() => rebuiltFrom(tree, root, tree)).toThrow("no property carrying a `unique`")
})

test("a rebuild takes away an entry no page carries", () => {
  const { tree, root } = bare()
  put(tree, "domain.page-type.ts", bodyOf(aType("1", "domain", "page")[1]))
  put(tree, "a.domain.ts", bodyOf({ id: A, pageTypeSlug: "domain", slug: "a" }))
  rebuiltFrom(tree, root, tree)

  const stale = slugFile(root, "domain", "gone")
  mkdirSync(dirname(stale), { recursive: true })
  writeFileSync(stale, `${JSON.stringify({ path: "nowhere", id: C })}\n`)
  rebuiltFrom(tree, root, tree)

  expect(existsSync(stale)).toBe(false)
  expect(existsSync(slugFile(root, "domain", "a"))).toBe(true)
})

test("a body that drops an import loses that edge and keeps the one it kept", () => {
  const { tree, root } = bare()
  wroteText(root, tree, IMPORTS_AT, IMPORTS, null)
  wroteText(root, tree, IMPORTS_AT, 'import { b } from "./b.ts"\n', IMPORTS)

  expect(existsSync(importFile(root, "c.ts"))).toBe(false)
  expect(linesIn(importFile(root, "d/b.ts"))).toEqual([`{"path":"${IMPORTS_AT}"}`])
})

test("a file taken away leaves none of the edges it left", () => {
  const { tree, root } = bare()
  const at = wroteText(root, tree, IMPORTS_AT, IMPORTS, null)
  expect(existsSync(importFile(root, "c.ts"))).toBe(true)

  tookAway(root, tree, at, IMPORTS)

  expect(existsSync(join(root, "import"))).toBe(false)
})

test("a file a page property holds is not loaded, so it is neither run nor read as a page", () => {
  const { tree, root } = grounded()
  const ran = join(tree, "ran")
  const body = `import { writeFileSync } from "node:fs"\nwriteFileSync("${ran}", "x")\nexport const it = { id: "${D}", pageTypeSlug: "domain", slug: "d" }\n`
  const indexing = indexingAt(root, tree)
  indexing.wrote(put(tree, "x.module.code.ts", body), body, null)

  expect(indexing.settle()).toEqual([])
  expect(existsSync(ran)).toBe(false)
  expect(existsSync(idFile(root, D))).toBe(false)
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
  settled(
    root,
    tree,
    "deep/a.module.ts",
    { id: A, pageTypeSlug: "module", slug: "a", code: "ts" },
    null
  )

  const held = everyFileUnder(root)
    .flatMap((one) => one.split("\n"))
    .filter((one) => one.includes(`"path"`))
    .map((one) => one.slice(one.indexOf("{")))
  expect(held.length).toBeGreaterThan(0)
  for (const line of held) {
    expect((JSON.parse(line) as { path: string }).path.startsWith("/")).toBe(false)
  }
})
