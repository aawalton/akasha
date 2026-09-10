import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { noGlobalInAModule } from "./no-global-in-a-module.code-check.check.code.ts"
import {
  CARRIES,
  CLEAN,
  DECLARED_AT,
  LIFTED,
  ONE_AT,
  rooted,
  scratch,
  TWO_AT,
} from "./no-global-in-a-module.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noGlobalInAModule(held, cast.shadow)
}

test("a module body the change carries with a declare global block is refused", () => {
  const said = judged(rooted({ [ONE_AT]: CARRIES }), [ONE_AT])
  expect(said.map((one) => one.path)).toEqual([ONE_AT])
})

test("a declaration file the change carries is refused nothing", () => {
  expect(judged(rooted({ [DECLARED_AT]: LIFTED }), [DECLARED_AT])).toEqual([])
})

test("a module the change does not carry is refused nothing though it carries a block", () => {
  const root = rooted({ [ONE_AT]: CLEAN, [TWO_AT]: CARRIES })
  expect(judged(root, [ONE_AT])).toEqual([])
})

test("one dirty module in a change carrying two is the only one refused", () => {
  const root = rooted({ [ONE_AT]: CARRIES, [TWO_AT]: CARRIES })
  expect(judged(root, [ONE_AT]).map((one) => one.path)).toEqual([ONE_AT])
})
