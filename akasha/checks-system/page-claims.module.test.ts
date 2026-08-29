import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { corpusIn } from "../write-system/corpus.module.code.ts"
import { claimsIn, fileKindIn } from "./page-claims.module.code.ts"

const SPINE = [
  { at: "page.page-type.ts", value: { extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "page-property-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "module.page-type.ts", value: { extendsSlug: "page" } },
  { at: "code.page-property-type.ts", value: { kind: "file" } },
  { at: "test.page-property-type.ts", value: { kind: "file" } },
  { at: "definition.page-property-type.ts", value: { kind: "text" } },
]

let count = 0

function stage(more: Readonly<Record<string, Record<string, unknown>>> = {}): string {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-claims-${count}-`)
  for (const one of SPINE) write(root, one.at, one.value)
  for (const [at, value] of Object.entries(more)) write(root, at, value)
  return root
}

function write(root: string, at: string, value: Record<string, unknown>): void {
  const named = at.slice(at.lastIndexOf("/") + 1).split(".")[0] ?? "held"
  const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
  writeFileSync(`${root}/${at}`, `export const ${key} = ${JSON.stringify({ slug: named, ...value })}\n`)
}

function corpusAt(root: string) {
  const corpus = corpusIn(root)
  if ("refused" in corpus) throw new Error(corpus.refused)
  return corpus
}

test("which properties are held in a file is read from the property types", () => {
  const root = stage()
  expect(fileKindIn(corpusAt(root)).map((one) => one.slug).sort()).toEqual(["code", "test"])
  rmSync(root, { recursive: true })
})

test("a page stating a file property claims the file named for its page and that property", () => {
  const root = stage({ "corpus.module.ts": { code: "ts" } })
  const said = claimsIn(corpusAt(root))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(`${root}/corpus.module.code.ts`)
  expect(said[0]?.stated).toBe("ts")
  rmSync(root, { recursive: true })
})

test("a page stating two file properties claims both files", () => {
  const root = stage({ "corpus.module.ts": { code: "ts", test: "ts" } })
  const said = claimsIn(corpusAt(root)).map((one) => one.path.slice(root.length + 1)).sort()
  expect(said).toEqual(["corpus.module.code.ts", "corpus.module.test.ts"])
  rmSync(root, { recursive: true })
})

test("a page stating no file property claims nothing", () => {
  const root = stage({ "corpus.module.ts": { definition: "held" } })
  expect(claimsIn(corpusAt(root))).toEqual([])
  rmSync(root, { recursive: true })
})

test("a claim is made whether or not the file it names is there", () => {
  const root = stage({ "corpus.module.ts": { code: "ts" } })
  const said = claimsIn(corpusAt(root))
  expect(said).toHaveLength(1)
  rmSync(root, { recursive: true })
})

test("a property stated as something other than text claims no file", () => {
  const root = stage({ "corpus.module.ts": { code: "" } })
  expect(claimsIn(corpusAt(root))).toEqual([])
  rmSync(root, { recursive: true })
})
