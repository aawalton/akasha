import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { popoverKeepsItsViewportCap } from "./popover-keeps-its-viewport-cap.code-check.code.ts"
import {
  rooted,
  scratch,
  USES_AT,
  WRAPPER,
  WRAPPER_AT,
} from "./popover-keeps-its-viewport-cap.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(uses: string): readonly Judged[] {
  const root = rooted({ [WRAPPER_AT]: WRAPPER, [USES_AT]: uses })
  const held = change(root, [USES_AT])
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return popoverKeepsItsViewportCap(held, cast.shadow)
}

test("the check refuses a tsx the change carries whose named tag undoes its cap", () => {
  const said = judged('const one = <PopoverContent className="max-w-none" />\n')

  expect(said.map((one) => one.path)).toEqual([USES_AT])
  expect(said[0]?.reason).toContain("undoes the viewport cap")
})

test("the check lets through a tsx whose named tag keeps its cap", () => {
  expect(judged('const one = <PopoverContent className="p-2" />\n')).toEqual([])
})

test("the check takes a tsx body as its input and no other body", () => {
  const root = rooted({ [WRAPPER_AT]: WRAPPER, [USES_AT]: "const one = 1\n" })
  const cast = shadowFor(change(root, [USES_AT]))
  if ("refused" in cast) throw new Error(cast.refused)

  expect(popoverKeepsItsViewportCap.isInput(USES_AT, cast.shadow)).toBe(true)
  expect(popoverKeepsItsViewportCap.isInput("web/one/one.module.code.ts", cast.shadow)).toBe(false)
})
