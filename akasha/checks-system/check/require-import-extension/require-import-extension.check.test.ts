import { expect, test } from "bun:test"
import { requireImportExtension } from "./require-import-extension.check.code.ts"

const ROOT = "/repo/akasha"

function given(at: string, body: string) {
  return { root: ROOT, path: `${ROOT}/${at}`, bytes: Buffer.from(body, "utf8") }
}

test("a relative import carrying its extension is let through", () => {
  const said = requireImportExtension(
    given("checks-system/checking.module.code.ts", 'import { one } from "./corpus.module.code.ts"\n')
  )
  expect(said).toEqual([])
})

test("a relative import written bare is refused, and names the specifier", () => {
  const said = requireImportExtension(given("held.ts", 'import { one } from "./corpus.module.code"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`./corpus.module.code`")
  expect(said[0]).toContain("without the `.ts` extension")
})

test("a package is not this check's business, however it is spelled", () => {
  const body = [
    'import ts from "typescript"',
    'import { readFileSync } from "node:fs"',
    'import { test } from "bun:test"',
  ].join("\n")
  expect(requireImportExtension(given("held.ts", body))).toEqual([])
})

test("a specifier climbing to a parent folder is judged the same as one beside it", () => {
  const said = requireImportExtension(given("a/b/held.ts", 'import { one } from "../../write-system/corpus"\n'))
  expect(said).toHaveLength(1)
})

test("a type-only import written bare is refused the same as a value one", () => {
  const said = requireImportExtension(given("held.ts", 'import type { One } from "./check.page-type"\n'))
  expect(said).toHaveLength(1)
})

test("a re-export, a dynamic import and a require are all judged", () => {
  const body = [
    'export { one } from "./a"',
    'const two = await import("./b")',
    'const three = require("./c")',
  ].join("\n")
  expect(requireImportExtension(given("held.ts", body))).toHaveLength(3)
})

test("an extension that is not `.ts` does not answer for the one this folder writes", () => {
  const body = ['import a from "./one.js"', 'import b from "./two.json"'].join("\n")
  expect(requireImportExtension(given("held.ts", body))).toHaveLength(2)
})

test("a file that is not TypeScript is passed over", () => {
  expect(requireImportExtension(given("notes.txt", 'import { one } from "./a"\n'))).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: `${ROOT}/raw.ts`, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(requireImportExtension(held)).toEqual([])
})

test("a string that merely looks like a specifier is not one", () => {
  const body = ['import { a } from "./one.ts"', 'const b = "./not-an-import"'].join("\n")
  expect(requireImportExtension(given("held.ts", body))).toEqual([])
})
