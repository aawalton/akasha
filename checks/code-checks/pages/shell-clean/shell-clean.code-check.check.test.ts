import { afterAll, expect, test } from "bun:test"
import { shadowAt } from "@akasha/pages/shadow"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { landing } from "../../../modules/scratch/check-scratch.module.code.ts"
import { shellClean } from "./shell-clean.code-check.check.code.ts"
import {
  CLEAN,
  FAULT,
  ONE,
  rooted,
  scratch,
  UNQUOTED,
} from "./shell-clean.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(text: string): readonly Judged[] {
  const root = rooted()
  return shellClean(landing(root, { [ONE]: bytesOf(text) }), shadowAt(root))
}

test("the check refuses a shell script the change carries that the linter finds fault in", () => {
  const said = judged(FAULT)

  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(said[0]?.reason).toContain("SC2086")
  expect(said[0]?.reason).toContain(UNQUOTED)
})

test("the check lets through a shell script the linter finds nothing in", () => {
  expect(judged(CLEAN)).toEqual([])
})

test("a shell script wakes the check and a file of any other kind does not", () => {
  const shadow = shadowAt(rooted())
  const held = [ONE, "akasha/one.ts", "akasha/held.md"]

  expect(held.map((one) => shellClean.isInput(one, shadow))).toEqual([true, false, false])
})
