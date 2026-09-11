import { expect, test } from "bun:test"
import { reasonsIn } from "akasha/checks/code-checks/pages/no-relative-specifier/no-relative-specifier.code-check.decision.code.ts"
import { bodiesIn } from "akasha/testing-system/bodying/bodying.module.code.ts"

const ROOT = "/repo"

const given = bodiesIn(ROOT)

const AT = "akasha/a/b/held.module.code.ts"

test("a specifier opening with a dot and a slash is refused, and names the specifier", () => {
  const said = reasonsIn(given(AT, 'import { one } from "./ledger.module.code.ts"\n'))

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`./ledger.module.code.ts`")
  expect(said[0]).toContain("names a file by a relative path")
})

test("a specifier climbing to a parent folder is refused too", () => {
  const said = reasonsIn(given(AT, 'import { one } from "../../c/ledger.module.code.ts"\n'))

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`../../c/ledger.module.code.ts`")
})

test("a specifier spelled from the root package is let through", () => {
  const body = 'import { one } from "akasha/c/ledger.module.code.ts"\n'

  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a specifier naming a package is let through, however that package is spelled", () => {
  const body = [
    'import ts from "typescript"',
    'import { readFileSync } from "node:fs"',
    'import { test } from "bun:test"',
    'import { one } from "@shared/pages-query"',
  ].join("\n")

  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a string that merely looks like a relative path is no specifier", () => {
  const body = ['const said = "./not-an-import"', "export const held = [said]"].join("\n")

  expect(reasonsIn(given(AT, body))).toEqual([])
})

test("a type-only import, a re-export, a dynamic import and a require are all judged", () => {
  const body = [
    'import type { One } from "./a.module.code.ts"',
    'export { two } from "./b.module.code.ts"',
    'const three = await import("./c.module.code.ts")',
    'const four = require("./d.module.code.ts")',
  ].join("\n")

  expect(reasonsIn(given(AT, body))).toHaveLength(4)
})

test("one body spelling several relative paths is refused once for each", () => {
  const body = [
    'import { one } from "./a.module.code.ts"',
    'import { two } from "../b.module.code.ts"',
  ].join("\n")

  expect(reasonsIn(given(AT, body))).toHaveLength(2)
})

test("a file that is not code is passed over", () => {
  const body = 'import { one } from "./a.module.code.ts"\n'

  expect(reasonsIn(given("akasha/notes.txt", body))).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }

  expect(() => reasonsIn(held)).toThrow("akasha/raw.ts")
})

test("a body spelling no quote before a dot and a slash is let through unparsed", () => {
  const body = "export const one = 1\n"

  expect(reasonsIn(given(AT, body))).toEqual([])
})
