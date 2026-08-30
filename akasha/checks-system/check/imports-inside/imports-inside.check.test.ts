import { expect, test } from "bun:test"
import { bodiesIn } from "../../../testing-system/bodying/bodying.module.code.ts"
import { reachedBy, reasonsIn } from "./imports-inside.check.code.ts"

const ROOT = "/repo"

const given = bodiesIn(ROOT)

test("a relative import landing inside the akasha folder is let through", () => {
  const said = reasonsIn(
    given(
      "akasha/write-system/landing.module.code.ts",
      'import { one } from "./reading.module.code.ts"\n'
    )
  )
  expect(said).toEqual([])
})

test("a relative import climbing out of the akasha folder is refused, and names where it lands", () => {
  const said = reasonsIn(
    given(
      "akasha/write-system/landing.module.code.ts",
      'import { one } from "../../graph/page-index.ts"\n'
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`graph/page-index.ts`")
  expect(said[0]).toContain("imports no file outside the akasha folder")
})

test("a package is not the akasha folder's business, however it is spelled", () => {
  const body = [
    'import ts from "typescript"',
    'import { readFileSync } from "node:fs"',
    'import { test } from "bun:test"',
    'import one from "@shared/pages-query"',
  ].join("\n")
  expect(reasonsIn(given("akasha/held.ts", body))).toEqual([])
})

test("a type-only import that leaves is refused the same as a value one", () => {
  const said = reasonsIn(
    given("akasha/held.ts", 'import type { One } from "../shared/verdict/verdict.ts"\n')
  )
  expect(said).toHaveLength(1)
})

test("a re-export, a dynamic import and a require are all specifiers", () => {
  const body = [
    'export { one } from "../a.ts"',
    'const two = await import("../b.ts")',
    'const three = require("../c.ts")',
  ].join("\n")
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(3)
})

test("a bare re-export naming everything is a specifier", () => {
  expect(reasonsIn(given("akasha/held.ts", 'export * from "../a.ts"\n'))).toHaveLength(1)
})

test("an import written inside a type position is a specifier too", () => {
  const said = reasonsIn(given("akasha/held.ts", 'export type One = import("../d.ts").Two\n'))
  expect(said).toHaveLength(1)
})

test("an import equals require is a specifier too", () => {
  const said = reasonsIn(given("akasha/held.ts", 'import one = require("../e.ts")\n'))
  expect(said).toHaveLength(1)
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", 'import { one } from "../a.ts"\n'))).toEqual([])
})

test("a file outside the akasha folder is not this check's business", () => {
  const said = reasonsIn(given("shared/held.ts", 'import { one } from "../other/a.ts"\n'))
  expect(said).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(reasonsIn(held)).toEqual([])
})

test("where a relative specifier lands is read from the file holding it", () => {
  const deep = reasonsIn(
    given(
      "akasha/a/b/c/held.ts",
      'import { one } from "../../../write-system/corpus.module.code.ts"\n'
    )
  )
  expect(deep).toEqual([])
  const out = reasonsIn(given("akasha/a/held.ts", 'import { one } from "../../outside.ts"\n'))
  expect(out).toHaveLength(1)
})

test("a sibling folder whose name begins with akasha is outside the akasha folder", () => {
  const said = reasonsIn(
    given("akasha/a/held.ts", 'import { one } from "../../akasha-notes/z.ts"\n')
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`akasha-notes/z.ts`")
})

test("a specifier climbing to the repo root is refused", () => {
  expect(reasonsIn(given("akasha/held.ts", 'import { one } from "../root.ts"\n'))).toHaveLength(1)
})

test("an absolute specifier is refused, because no absolute path is inside the akasha folder", () => {
  const said = reasonsIn(given("akasha/held.ts", 'import { one } from "/etc/held.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("/etc/held.ts")
})

test("a specifier is judged by where it lands, not by what is there", () => {
  const said = reasonsIn(
    given("akasha/held.ts", 'import { one } from "../never-written/at-all.ts"\n')
  )
  expect(said).toHaveLength(1)
})

test("a package names no landing, and a relative specifier names one under the holder", () => {
  expect(reachedBy("akasha/a/held.ts", "typescript")).toBeNull()
  expect(reachedBy("akasha/a/held.ts", "./b.ts")).toBe("akasha/a/b.ts")
  expect(reachedBy("akasha/a/held.ts", "../../b.ts")).toBe("b.ts")
})

test("a specifier spelt from the root names itself, so what it reaches is still judged", () => {
  expect(reachedBy("akasha/a/held.ts", "/etc/passwd")).toBe("/etc/passwd")
  expect(reasonsIn(given("akasha/held.ts", 'import { one } from "/etc/passwd"\n'))).toHaveLength(1)
})
