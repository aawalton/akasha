import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { specifierNamesAPackage } from "./specifier-names-a-package.code-check.check.code.ts"
import {
  AT,
  GONE,
  rooted,
  STATED,
  scratch,
} from "./specifier-names-a-package.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(text: string): readonly Judged[] {
  const held = change(rooted({ [AT]: text }), [AT])
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return specifierNamesAPackage(held, cast.shadow)
}

test("the check refuses a body the change carries that reaches by a name no manifest states", () => {
  const said = judged(GONE)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("@akasha/gone")
})

test("the check lets through a body reaching by a name a manifest states", () => {
  expect(judged(STATED)).toEqual([])
})

test("the check takes every file the change carries as its input", () => {
  const held = change(rooted({ [AT]: STATED }), [AT])
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)

  expect(specifierNamesAPackage.isInput(AT, cast.shadow)).toBe(true)
  expect(specifierNamesAPackage.isInput("alan/other/held.md", cast.shadow)).toBe(true)
})
