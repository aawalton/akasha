import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { gitIn } from "../../../testing-system/gitting/gitting.module.code.ts"
import { stampKept } from "../index-stamp/index-stamp.module.code.ts"
import {
  everyPath,
  importersOf,
  indexIn,
  schemaOf,
  standingById,
  standingByPath,
} from "./index-reading.module.code.ts"

const A = "01a04bdd-0000-7000-8000-00000000000a"
const B = "01a04bdd-0000-7000-8000-00000000000b"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootAt(): string {
  return scratch.rootFor("akasha-reading-")
}

function filed(root: string, at: string, lines: readonly string[]): undefined {
  const path = join(indexIn(root), at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${lines.join("\n")}\n`)
}

function line(path: string, id: string): string {
  return JSON.stringify({ path, id })
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
  filed(root, "path/akasha/a.module.code.ts.jsonl", [line("akasha/a.module.ts", A)])

  expect(standingByPath(root, "akasha/a.module.code.ts")).toEqual([
    { path: "akasha/a.module.ts", id: A },
  ])
})

test("a page's own path is answered with itself", () => {
  const root = rootAt()
  filed(root, "path/akasha/a.module.ts.jsonl", [line("akasha/a.module.ts", A)])

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
  filed(root, "path/x.module.code.ts.jsonl", [line("x.module.code.ts", B), line("x.module.ts", A)])

  expect(standingByPath(root, "x.module.code.ts").map((one) => one.id)).toEqual([B, A])
})

test("every path the index files is answered, however deep the folders it files them under", () => {
  const root = rootAt()
  filed(root, "path/akasha/a.module.ts.jsonl", [line("akasha/a.module.ts", A)])
  filed(root, "path/akasha/a.module.code.ts.jsonl", [line("akasha/a.module.ts", A)])
  filed(root, "path/akasha/held/b.module.ts.jsonl", [line("akasha/held/b.module.ts", B)])

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
  filed(root, `identity/page/id/${A}.jsonl`, [line("akasha/a.module.ts", A)])

  expect(standingById(root, A)).toEqual({ path: "akasha/a.module.ts", id: A })
  expect(standingById(root, B)).toBe(null)
})

function schemaFiled(root: string, slug: string, line: string): undefined {
  filed(root, `schema/page-property/slug/${slug}.jsonl`, [line])
}

test("a relation property is answered with the shape it is and the page type it may name", () => {
  const root = rootAt()
  schemaFiled(
    root,
    "domain-slug",
    '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain"}'
  )

  expect(schemaOf(root, "domain-slug")).toEqual({
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "domain",
  })
})

test("a property that names no page is answered with a shape that is not a relation", () => {
  const root = rootAt()
  schemaFiled(root, "definition", '{"pageTypeSlug":"text-property","targetPageTypeSlug":null}')

  expect(schemaOf(root, "definition")).toEqual({
    pageTypeSlug: "text-property",
    targetPageTypeSlug: null,
  })
})

test("a property naming many pages is answered with the target it names itself", () => {
  const root = rootAt()
  schemaFiled(
    root,
    "part-slugs",
    '{"pageTypeSlug":"relation-property","targetPageTypeSlug":"domain"}'
  )

  expect(schemaOf(root, "part-slugs")).toEqual({
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "domain",
  })
})

test("a property the index does not carry is answered with nothing rather than by throwing", () => {
  const root = rootAt()

  expect(schemaOf(root, "nowhere")).toBe(null)
})

test("a path the index carries edges for is answered with every file importing it", () => {
  const root = stampedAt()
  filed(root, "import/path/akasha/a.module.code.ts.jsonl", [
    JSON.stringify({ path: "akasha/two.module.code.ts" }),
    JSON.stringify({ path: "akasha/one.module.code.ts" }),
  ])

  expect(importersOf(root, "akasha/a.module.code.ts")).toEqual([
    "akasha/one.module.code.ts",
    "akasha/two.module.code.ts",
  ])
})

test("a path nothing imports is answered with nothing rather than by throwing", () => {
  const root = stampedAt()

  expect(importersOf(root, "akasha/nowhere.module.code.ts")).toEqual([])
})

test("what imports a file is refused when the index names no commit", () => {
  const root = committedAt()
  filed(root, "import/path/akasha/a.module.code.ts.jsonl", [
    JSON.stringify({ path: "akasha/one.module.code.ts" }),
  ])

  expect(() => importersOf(root, "akasha/a.module.code.ts")).toThrow(/names no commit/)
})

test("what imports a file is refused when a commit the index never saw stands", () => {
  const root = stampedAt()
  filed(root, "import/path/akasha/a.module.code.ts.jsonl", [
    JSON.stringify({ path: "akasha/one.module.code.ts" }),
  ])
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, "akasha", "late.ts"), "export const late = 1\n")
  gitIn(root, ["add", "--", "akasha/late.ts"])
  gitIn(root, ["commit", "--quiet", "-m", "late", "--", "akasha/late.ts"])

  expect(() => importersOf(root, "akasha/a.module.code.ts")).toThrow(/akasha\/late\.ts/)
})
