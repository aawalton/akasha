import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Leaving } from "../../../checks-system/judging.module.code.ts"
import { wholeOf } from "../../checking.module.code.ts"
import { pagePropertyHasItsFile } from "./page-property-has-its-file.check.code.ts"

const SPINE = [
  { at: "page.page-type.ts", value: { extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "page-property-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "module.page-type.ts", value: { extendsSlug: "page" } },
  { at: "code.page-property-type.ts", value: { kind: "file" } },
]

let count = 0

function stage(more: Readonly<Record<string, Record<string, unknown>>> = {}): string {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-property-${count}-`)
  for (const one of SPINE) write(root, one.at, one.value)
  for (const [at, value] of Object.entries(more)) write(root, at, value)
  return root
}

function write(root: string, at: string, value: Record<string, unknown>): void {
  const named = at.slice(at.lastIndexOf("/") + 1).split(".")[0] ?? "held"
  const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
  writeFileSync(`${root}/${at}`, `export const ${key} = ${JSON.stringify({ slug: named, ...value })}\n`)
}

function overAll(root: string): Leaving {
  return {
    root,
    changed: [],
    at: (path) => {
      try {
        return require("node:fs").readFileSync(path) as Uint8Array
      } catch {
        return null
      }
    },
  }
}

test("a page whose property file is there and has a body is judged clean", () => {
  const root = stage({ "corpus.module.ts": { code: "ts" } })
  writeFileSync(`${root}/corpus.module.code.ts`, "export const one = 1\n")
  expect(pagePropertyHasItsFile(wholeOf(overAll(root)))).toEqual([])
  rmSync(root, { recursive: true })
})

test("a page stating a property whose file is missing is refused, and the file is named", () => {
  const root = stage({ "corpus.module.ts": { code: "ts" } })
  const said = pagePropertyHasItsFile(wholeOf(overAll(root)))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("nothing is at `corpus.module.code.ts`")
  rmSync(root, { recursive: true })
})

test("the finding is kept against the page that made the claim, not the file that is absent", () => {
  const root = stage({ "corpus.module.ts": { code: "ts" } })
  const said = pagePropertyHasItsFile(wholeOf(overAll(root)))
  expect(said[0]?.path).toBe(`${root}/corpus.module.ts`)
  rmSync(root, { recursive: true })
})

test("a property's file that is empty is as missing as none, and says so differently", () => {
  const root = stage({ "corpus.module.ts": { code: "ts" } })
  writeFileSync(`${root}/corpus.module.code.ts`, "")
  const said = pagePropertyHasItsFile(wholeOf(overAll(root)))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("is empty")
  rmSync(root, { recursive: true })
})

test("a page stating no file property is not judged for one", () => {
  const root = stage({ "corpus.module.ts": {} })
  expect(pagePropertyHasItsFile(wholeOf(overAll(root)))).toEqual([])
  rmSync(root, { recursive: true })
})

test("a change taking away a property's file is refused while the page still states it", () => {
  const root = stage({ "corpus.module.ts": { code: "ts" } })
  writeFileSync(`${root}/corpus.module.code.ts`, "export const one = 1\n")
  const said = pagePropertyHasItsFile(
    wholeOf({
      root,
      changed: [`${root}/corpus.module.code.ts`],
      at: (path) =>
        path === `${root}/corpus.module.code.ts`
          ? null
          : (require("node:fs").readFileSync(path) as Uint8Array),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("nothing is at")
  rmSync(root, { recursive: true })
})
