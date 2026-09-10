import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { nameFormatJudgesByOneShape } from "./name-format-judges-by-one-shape.code-check.check.code.ts"
import {
  AT,
  IMPORTING,
  rooted,
  scratch,
} from "./name-format-judges-by-one-shape.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(root: string): readonly Judged[] {
  const held = change(root, [])
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return nameFormatJudgesByOneShape(held, cast.shadow)
}

test("a name format the index files and no property names is judged and let through", () => {
  expect(
    judged(rooted(`${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z-]+$/)\n`))
  ).toEqual([])
})

test("a name format the index files is refused for a `g` its shape carries", () => {
  const said = judged(
    rooted(`${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z-]+$/g)\n`)
  )
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("carries the flags `g`")
})
