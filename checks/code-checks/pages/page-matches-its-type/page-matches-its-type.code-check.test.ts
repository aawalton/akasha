import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { pageMatchesItsType } from "./page-matches-its-type.code-check.code.ts"
import {
  rooting,
  scratch,
  THING_AT,
  THING_BODY,
  THING_EXTRA,
  wrote,
} from "./page-matches-its-type.code-check.decision.test-fixtures.ts"

const UNDER = "akasha-matches-bound-"

afterAll(scratch.sweep)

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return pageMatchesItsType(held, cast.shadow)
}

test("the check refuses a page stating what its type does not declare", () => {
  const root = wrote(rooting(UNDER), { [THING_AT]: THING_EXTRA })

  const said = judged(root, [THING_AT])

  expect(said.map((one) => one.path)).toEqual([THING_AT])
  expect(said[0]?.reason).toContain("does not declare")
})

test("the check lets through a page carrying what its type declares", () => {
  const root = wrote(rooting(UNDER), { [THING_AT]: THING_BODY })

  expect(judged(root, [THING_AT])).toEqual([])
})

test("the check takes a page as its input and no file that is no page", () => {
  const root = wrote(rooting(UNDER), { [THING_AT]: THING_BODY })
  const cast = shadowFor(change(root, [THING_AT]))
  if ("refused" in cast) throw new Error(cast.refused)

  expect(pageMatchesItsType.isInput(THING_AT, cast.shadow)).toBe(true)
  expect(pageMatchesItsType.isInput("akasha/one.ts", cast.shadow)).toBe(false)
})
