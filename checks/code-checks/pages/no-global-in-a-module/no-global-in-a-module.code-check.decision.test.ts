import { expect, test } from "bun:test"
import { moduleAt, reasonsIn } from "./no-global-in-a-module.code-check.decision.code.ts"
import {
  CARRIES,
  CLEAN,
  DECLARED_AT,
  ONE_AT,
  TWICE,
} from "./no-global-in-a-module.code-check.decision.test-fixtures.ts"

test("a module body carrying a declare global block is refused", () => {
  expect(reasonsIn(ONE_AT, CARRIES)).toHaveLength(1)
})

test("the same module with the block taken out is refused nothing", () => {
  expect(reasonsIn(ONE_AT, CLEAN)).toEqual([])
})

test("the refusal names the line the block opens on", () => {
  expect(reasonsIn(ONE_AT, CARRIES)[0]).toContain("at line 3")
})

test("the refusal says where the block goes", () => {
  expect(reasonsIn(ONE_AT, CARRIES)[0]).toContain("Lift the block into a `.d.ts`")
})

test("a module carrying two blocks is refused twice", () => {
  expect(reasonsIn(ONE_AT, TWICE)).toHaveLength(2)
})

test("a module akasha compiles is input to this check", () => {
  expect(moduleAt(ONE_AT)).toBe(true)
})

test("a declaration file is no input, so it is the destination rather than a second offence", () => {
  expect(moduleAt(DECLARED_AT)).toBe(false)
})

test("a module naming a namespace that is not global is refused nothing", () => {
  const held = "export const away = 1\n\ndeclare module Held {\n  const ONE: number\n}\n"
  expect(reasonsIn(ONE_AT, held)).toEqual([])
})

test("a block sitting inside a declaration about a package is refused like one at the top", () => {
  const held = 'declare module "foo" {\n  global {\n    const ONE: number\n  }\n}\n'
  expect(reasonsIn(ONE_AT, held)).toHaveLength(1)
})

test("a block sitting inside a namespace is refused like one at the top", () => {
  const held = "declare namespace Held {\n  global {\n    const ONE: number\n  }\n}\n"
  expect(reasonsIn(ONE_AT, held)).toHaveLength(1)
})
