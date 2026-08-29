import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Leaving } from "../../../checks-system/judging.module.code.ts"
import { wholeOf } from "../../checking.module.code.ts"
import { fileHasItsPage } from "./file-has-its-page.check.code.ts"

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
  const root = mkdtempSync(`${tmpdir()}/akasha-claimed-${count}-`)
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

test("a tree where every file is a page or a property's own file is judged clean", () => {
  const root = stage({ "corpus.module.ts": { code: "ts" } })
  writeFileSync(`${root}/corpus.module.code.ts`, "export const one = 1\n")
  expect(fileHasItsPage(wholeOf(overAll(root)))).toEqual([])
  rmSync(root, { recursive: true })
})

test("a file no page claims is refused, and the finding is kept against that file", () => {
  const root = stage()
  writeFileSync(`${root}/stray.txt`, "nobody asked for me\n")
  const said = fileHasItsPage(wholeOf(overAll(root)))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(`${root}/stray.txt`)
  expect(said[0]?.reason).toContain("no page claims this file")
  rmSync(root, { recursive: true })
})

test("a property's file is claimed by the page that states the property", () => {
  const root = stage({ "corpus.module.ts": { code: "ts" } })
  writeFileSync(`${root}/corpus.module.code.ts`, "export const one = 1\n")
  const said = fileHasItsPage(wholeOf(overAll(root)))
  expect(said.map((one) => one.path)).not.toContain(`${root}/corpus.module.code.ts`)
  rmSync(root, { recursive: true })
})

test("a property's file whose page does not state the property is claimed by nobody", () => {
  const root = stage({ "corpus.module.ts": {} })
  writeFileSync(`${root}/corpus.module.code.ts`, "export const one = 1\n")
  const said = fileHasItsPage(wholeOf(overAll(root)))
  expect(said.map((one) => one.path)).toEqual([`${root}/corpus.module.code.ts`])
  rmSync(root, { recursive: true })
})

test("a file the change would add is judged, so an unclaimed arrival is caught before it lands", () => {
  const root = stage()
  const said = fileHasItsPage(
    wholeOf({
      root,
      changed: [`${root}/arrives.txt`],
      at: (path) =>
        path === `${root}/arrives.txt`
          ? Buffer.from("new", "utf8")
          : (require("node:fs").readFileSync(path) as Uint8Array),
    })
  )
  expect(said.map((one) => one.path)).toEqual([`${root}/arrives.txt`])
  rmSync(root, { recursive: true })
})

test("a file the change would take away is not judged, because it would not be there", () => {
  const root = stage()
  writeFileSync(`${root}/stray.txt`, "going\n")
  const said = fileHasItsPage(
    wholeOf({
      root,
      changed: [`${root}/stray.txt`],
      at: (path) =>
        path === `${root}/stray.txt`
          ? null
          : (require("node:fs").readFileSync(path) as Uint8Array),
    })
  )
  expect(said).toEqual([])
  rmSync(root, { recursive: true })
})
