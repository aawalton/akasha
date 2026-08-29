import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
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

function rootAt(): string {
  return mkdtempSync(join(tmpdir(), "akasha-reading-"))
}

function filed(root: string, at: string, lines: readonly string[]): void {
  const path = join(indexIn(root), at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${lines.join("\n")}\n`)
}

function line(path: string, id: string): string {
  return JSON.stringify({ path, id })
}

test("a path the index carries is answered with the page carrying it", () => {
  const root = rootAt()
  filed(root, "identity/page/path/akasha/a.module.code.ts.jsonl", [line("akasha/a.module.ts", A)])

  expect(standingByPath(root, "akasha/a.module.code.ts")).toEqual([{ path: "akasha/a.module.ts", id: A }])
  rmSync(root, { recursive: true, force: true })
})

test("a page's own path is answered with itself", () => {
  const root = rootAt()
  filed(root, "identity/page/path/akasha/a.module.ts.jsonl", [line("akasha/a.module.ts", A)])

  expect(standingByPath(root, "akasha/a.module.ts")).toEqual([{ path: "akasha/a.module.ts", id: A }])
  rmSync(root, { recursive: true, force: true })
})

test("a path no page carries is answered with nothing rather than by throwing", () => {
  const root = rootAt()

  expect(standingByPath(root, "akasha/nowhere.module.ts")).toEqual([])
  rmSync(root, { recursive: true, force: true })
})

test("a path two pages fall on is answered with both of them", () => {
  const root = rootAt()
  filed(root, "identity/page/path/x.module.code.ts.jsonl", [
    line("x.module.code.ts", B),
    line("x.module.ts", A),
  ])

  expect(standingByPath(root, "x.module.code.ts").map((one) => one.id)).toEqual([B, A])
  rmSync(root, { recursive: true, force: true })
})

test("every path the index files is answered, however deep the folders it files them under", () => {
  const root = rootAt()
  filed(root, "identity/page/path/akasha/a.module.ts.jsonl", [line("akasha/a.module.ts", A)])
  filed(root, "identity/page/path/akasha/a.module.code.ts.jsonl", [line("akasha/a.module.ts", A)])
  filed(root, "identity/page/path/akasha/held/b.module.ts.jsonl", [line("akasha/held/b.module.ts", B)])

  expect(everyPath(root)).toEqual([
    "akasha/a.module.code.ts",
    "akasha/a.module.ts",
    "akasha/held/b.module.ts",
  ])
  rmSync(root, { recursive: true, force: true })
})

test("a path directory that is not there is answered with nothing, the caller saying what that means", () => {
  const root = rootAt()

  expect(everyPath(root)).toEqual([])
  rmSync(root, { recursive: true, force: true })
})

test("an id the index carries is answered with the page carrying it", () => {
  const root = rootAt()
  filed(root, `identity/page/id/${A}.jsonl`, [line("akasha/a.module.ts", A)])

  expect(standingById(root, A)).toEqual({ path: "akasha/a.module.ts", id: A })
  expect(standingById(root, B)).toBe(null)
  rmSync(root, { recursive: true, force: true })
})

function schemaFiled(root: string, slug: string, line: string): void {
  filed(root, `schema/page-property-type/slug/${slug}.jsonl`, [line])
}

test("a relation property is answered with its kind and the page type it may name", () => {
  const root = rootAt()
  schemaFiled(root, "domain-slug", '{"kind":"relation","targetPageTypeSlug":"domain","entrySlug":null}')

  expect(schemaOf(root, "domain-slug")).toEqual({
    kind: "relation",
    targetPageTypeSlug: "domain",
    entrySlug: null,
  })
  rmSync(root, { recursive: true, force: true })
})

test("a property that names no page is answered with a kind that is not a relation", () => {
  const root = rootAt()
  schemaFiled(root, "definition", '{"kind":"text","targetPageTypeSlug":null,"entrySlug":null}')

  expect(schemaOf(root, "definition")?.kind).toBe("text")
  expect(schemaOf(root, "definition")?.targetPageTypeSlug).toBe(null)
  rmSync(root, { recursive: true, force: true })
})

test("a list property is answered with the property its entries are", () => {
  const root = rootAt()
  schemaFiled(root, "part-slugs", '{"kind":"list","targetPageTypeSlug":null,"entrySlug":"domain-slug"}')

  expect(schemaOf(root, "part-slugs")?.entrySlug).toBe("domain-slug")
  rmSync(root, { recursive: true, force: true })
})

test("a property the index does not carry is answered with nothing rather than by throwing", () => {
  const root = rootAt()

  expect(schemaOf(root, "nowhere")).toBe(null)
  rmSync(root, { recursive: true, force: true })
})

test("a path the index carries edges for is answered with every file importing it", () => {
  const root = rootAt()
  filed(root, "import/path/akasha/a.module.code.ts.jsonl", [
    JSON.stringify({ path: "akasha/two.module.code.ts" }),
    JSON.stringify({ path: "akasha/one.module.code.ts" }),
  ])

  expect(importersOf(root, "akasha/a.module.code.ts")).toEqual([
    "akasha/one.module.code.ts",
    "akasha/two.module.code.ts",
  ])
  rmSync(root, { recursive: true, force: true })
})

test("a path nothing imports is answered with nothing rather than by throwing", () => {
  const root = rootAt()

  expect(importersOf(root, "akasha/nowhere.module.code.ts")).toEqual([])
  rmSync(root, { recursive: true, force: true })
})
