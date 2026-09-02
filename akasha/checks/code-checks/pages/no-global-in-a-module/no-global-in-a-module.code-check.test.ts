import { afterAll, expect, test } from "bun:test"
import type { Change } from "@akasha/pages-system/change"
import { shadowFor } from "@akasha/pages-system/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change, scratch, staged } from "../typecheck/typecheck.code-check.test-fixtures.ts"
import { moduleAt, noGlobalInAModule, reasonsIn } from "./no-global-in-a-module.code-check.code.ts"

afterAll(scratch.sweep)

const ONE_AT = "akasha/one.module.code.ts"

const TWO_AT = "akasha/two.module.code.ts"

const DECLARED_AT = "akasha/held.type-declaration.d.ts"

const NAMES = "  const HELD: number\n\n  interface Held {\n    one: number\n  }\n"

const CARRIES = `export const away = 1\n\ndeclare global {\n${NAMES}}\n`

const CLEAN = "export const away = 1\n"

const LIFTED = "declare const HELD: number\n\ninterface Held {\n  one: number\n}\n"

const TWICE = `${CARRIES}\ndeclare global {\n  const OTHER: string\n}\n`

function judged(given: Change): readonly Judged[] {
  const cast = shadowFor(given)
  if ("refused" in cast) throw new Error(cast.refused)
  return noGlobalInAModule(given, cast.shadow)
}

function over(files: Readonly<Record<string, string>>, carried: string): readonly Judged[] {
  const root = staged(files)
  const body = files[carried]
  return judged(change(root, { [carried]: body === undefined ? "" : body }))
}

test("a module body carrying a declare global block is refused", () => {
  const said = over({ [ONE_AT]: CARRIES }, ONE_AT)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(ONE_AT)
})

test("the same module with the block taken out is refused nothing", () => {
  expect(over({ [ONE_AT]: CLEAN }, ONE_AT)).toEqual([])
})

test("a declaration file carrying the same names is refused nothing", () => {
  expect(over({ [DECLARED_AT]: LIFTED }, DECLARED_AT)).toEqual([])
})

test("a module the change does not carry is refused nothing though it carries a block", () => {
  const root = staged({ [ONE_AT]: CLEAN, [TWO_AT]: CARRIES })
  const said = judged(change(root, { [ONE_AT]: CLEAN }))
  expect(said).toEqual([])
})

test("one dirty module in a change carrying two is the only one refused", () => {
  const root = staged({ [ONE_AT]: CARRIES, [TWO_AT]: CARRIES })
  const said = judged(change(root, { [ONE_AT]: CARRIES }))
  expect(said.map((each) => each.path)).toEqual([ONE_AT])
})

test("the refusal names the line the block opens on", () => {
  expect(over({ [ONE_AT]: CARRIES }, ONE_AT)[0]?.reason).toContain("at line 3")
})

test("the refusal says where the block goes", () => {
  expect(over({ [ONE_AT]: CARRIES }, ONE_AT)[0]?.reason).toContain("Lift the block into a `.d.ts`")
})

test("a module carrying two blocks is refused twice", () => {
  expect(over({ [ONE_AT]: TWICE }, ONE_AT)).toHaveLength(2)
})

test("a module akasha compiles is input to this check", () => {
  expect(moduleAt(ONE_AT)).toBe(true)
})

test("a declaration file is no input", () => {
  expect(moduleAt(DECLARED_AT)).toBe(false)
})

test("a file outside akasha is no input", () => {
  expect(moduleAt("temper/one.module.code.ts")).toBe(false)
})

test("a module naming a namespace that is not global is refused nothing", () => {
  const held = "export const away = 1\n\ndeclare module Held {\n  const ONE: number\n}\n"
  expect(reasonsIn({ root: "", path: ONE_AT, text: held })).toEqual([])
})
