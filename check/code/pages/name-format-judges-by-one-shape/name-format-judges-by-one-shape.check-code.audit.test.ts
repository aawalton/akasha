import { afterAll, expect, test } from "bun:test"
import { nameFormatJudgesByOneShape } from "akasha/check/code/pages/name-format-judges-by-one-shape/name-format-judges-by-one-shape.check-code.audit.code.ts"
import {
  AT,
  IMPORTING,
  scratch,
  tracked,
} from "akasha/check/code/pages/name-format-judges-by-one-shape/name-format-judges-by-one-shape.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a name format the whole tree holds and nothing is wrong with is let through", () => {
  const root = tracked(`${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z-]+$/)\n`)
  expect(nameFormatJudgesByOneShape(root)).toEqual([])
})

test("a name format the whole tree holds is refused for a `g` its shape carries", () => {
  const root = tracked(`${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z-]+$/g)\n`)
  const said = nameFormatJudgesByOneShape(root)
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("carries the flags `g`")
})
