import { expect, test } from "bun:test"
import { importsInside, specifiersIn } from "./imports-inside.check.code.ts"

const ROOT = "/repo/akasha"

function given(at: string, body: string) {
  return { root: ROOT, path: `${ROOT}/${at}`, bytes: Buffer.from(body, "utf8") }
}

test("a relative import landing inside the akasha folder is let through", () => {
  const said = importsInside(
    given("write-system/landing.module.code.ts", 'import { one } from "./reading.module.code.ts"\n')
  )
  expect(said).toEqual([])
})

test("a relative import climbing out of the akasha folder is refused, and names where it lands", () => {
  const said = importsInside(
    given("write-system/landing.module.code.ts", 'import { one } from "../../graph/page-index.ts"\n')
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("/repo/graph/page-index.ts")
  expect(said[0]).toContain("imports no file outside the akasha folder")
})

test("a package is not the akasha folder's business, however it is spelled", () => {
  const body = [
    'import ts from "typescript"',
    'import { readFileSync } from "node:fs"',
    'import { test } from "bun:test"',
  ].join("\n")
  expect(importsInside(given("held.ts", body))).toEqual([])
})

test("a type-only import that leaves is refused the same as a value one", () => {
  const said = importsInside(
    given("held.ts", 'import type { One } from "../../shared/verdict/verdict.ts"\n')
  )
  expect(said).toHaveLength(1)
})

test("a re-export, a dynamic import and a require are all specifiers", () => {
  const body = [
    'export { one } from "../../a.ts"',
    'const two = await import("../../b.ts")',
    'const three = require("../../c.ts")',
  ].join("\n")
  expect(importsInside(given("held.ts", body))).toHaveLength(3)
})

test("an import written inside a type position is a specifier too", () => {
  const said = importsInside(given("held.ts", 'export type One = import("../../d.ts").Two\n'))
  expect(said).toHaveLength(1)
})

test("a file that is not TypeScript is passed over", () => {
  expect(importsInside(given("notes.txt", 'import { one } from "../../a.ts"\n'))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: `${ROOT}/raw.ts`, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(importsInside(held)).toEqual([])
})

test("where a relative specifier lands is read from the file holding it", () => {
  const deep = importsInside(
    given("a/b/c/held.ts", 'import { one } from "../../../write-system/corpus.module.code.ts"\n')
  )
  expect(deep).toEqual([])
  const out = importsInside(given("a/held.ts", 'import { one } from "../../outside.ts"\n'))
  expect(out).toHaveLength(1)
})

test("every specifier a file writes is found, and nothing else is", () => {
  const body = ['import { a } from "./one.ts"', 'const b = "./not-an-import.ts"'].join("\n")
  expect(specifiersIn("held.ts", body)).toEqual(["./one.ts"])
})
