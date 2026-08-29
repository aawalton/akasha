import { expect, test } from "bun:test"
import { reasonsIn, specifiersIn } from "./require-import-extension.check.code.ts"

const ROOT = "/repo"

function given(at: string, body: string) {
  return { root: ROOT, path: at, bytes: new TextEncoder().encode(body) }
}

test("a relative import carrying its extension is let through", () => {
  const body = 'import { one } from "./corpus.module.code.ts"\n'
  const said = reasonsIn(given("akasha/checks-system/checking.module.code.ts", body))
  expect(said).toEqual([])
})

test("a relative import written bare is refused, and names the specifier", () => {
  const body = 'import { one } from "./corpus.module.code"\n'
  const said = reasonsIn(given("akasha/held.ts", body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`./corpus.module.code`")
  expect(said[0]).toContain("without the `.ts` extension")
})

test("a package is not this check's business, however it is spelled", () => {
  const body = [
    'import ts from "typescript"',
    'import { readFileSync } from "node:fs"',
    'import { test } from "bun:test"',
    'import { one } from "@shared/pages-query"',
  ].join("\n")
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("a specifier climbing to a parent folder is judged the same as one beside it", () => {
  const body = 'import { one } from "../../write-system/corpus"\n'
  expect(reasonsIn(given("akasha/a/b/held.ts", body))).toHaveLength(1)
})

test("a type-only import written bare is refused the same as a value one", () => {
  const body = 'import type { One } from "./check.page-type"\n'
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(1)
})

test("a re-export, a dynamic import and a require are all judged", () => {
  const body = [
    'export { one } from "./a"',
    'const two = await import("./b")',
    'const three = require("./c")',
  ].join("\n")
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(3)
})

test("an extension that is not `.ts` does not answer for the one this folder writes", () => {
  const body = ['import a from "./one.js"', 'import b from "./two.json"'].join("\n")
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(2)
})

test("a file that is not TypeScript is passed over", () => {
  const body = 'import { one } from "./a"\n'
  expect(reasonsIn(given("akasha/notes.txt", body))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(reasonsIn(held)).toEqual([])
})

test("a string that merely looks like a specifier is not one", () => {
  const body = ['import { a } from "./one.ts"', 'const b = "./not-an-import"'].join("\n")
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("a whole-folder re-export written bare is refused", () => {
  expect(reasonsIn(given("akasha/held.ts", 'export * from "./a"\n'))).toHaveLength(1)
})

test("a specifier written in a type position is judged the same as one written above", () => {
  const body = 'type One = import("./held").One\n'
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(1)
})

test("an import taken for its effect alone is judged", () => {
  expect(reasonsIn(given("akasha/held.ts", 'import "./a"\n'))).toHaveLength(1)
})

test("a specifier reaching down into a folder is judged by its own ending", () => {
  const body = ['import a from "./one/two.ts"', 'import b from "./one/two"'].join("\n")
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(1)
})

test("a specifier naming a folder rather than a file is refused, because it names no file", () => {
  const body = 'import a from "./one/"\n'
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(1)
})

test("every specifier a file writes is found, whichever form it is written in", () => {
  const body = [
    'import a from "./a.ts"',
    'export { b } from "./b.ts"',
    'const c = await import("./c.ts")',
    'const d = require("./d.ts")',
    'type E = import("./e.ts").E',
  ].join("\n")
  expect(specifiersIn("akasha/held.ts", body)).toEqual([
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts",
    "./e.ts",
  ])
})

test("a declaration file is judged, because its name ends in `.ts`", () => {
  const body = 'declare module "./a" {\n}\n'
  expect(reasonsIn(given("akasha/held.d.ts", body))).toEqual([])
})
