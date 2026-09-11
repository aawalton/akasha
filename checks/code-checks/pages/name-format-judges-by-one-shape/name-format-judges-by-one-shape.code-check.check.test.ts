import { afterAll, expect, test } from "bun:test"
import { nameFormatJudgesByOneShape } from "akasha/checks/code-checks/pages/name-format-judges-by-one-shape/name-format-judges-by-one-shape.code-check.check.code.ts"
import {
  AT,
  IMPORTING,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/name-format-judges-by-one-shape/name-format-judges-by-one-shape.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { change } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

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
