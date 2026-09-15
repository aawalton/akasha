import { afterAll, expect, test } from "bun:test"
import { changeReachesItsOwnTargetType } from "akasha/check/code/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.check-code.check.code.ts"
import {
  AT,
  CODE_AT,
  CROSS,
  PLAIN_AT,
  reaching,
  rooted,
  SAME,
  scratch,
} from "akasha/check/code/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  landing,
  shadowed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

function judged(text: string): readonly Judged[] {
  const held = landing(rooted(), { [CODE_AT]: bytesOf(text) })
  return changeReachesItsOwnTargetType(held, shadowed(held))
}

test("the check refuses a change whose code the landing carries reaching another target type", () => {
  const said = judged(reaching([CROSS]))

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain(`\`${CROSS}\``)
})

test("the check lets through a change reaching a change acting on the same target type", () => {
  expect(judged(reaching([SAME]))).toEqual([])
})

test("the check takes a change's page and the code beside it as its input and no other body", () => {
  const held = landing(rooted(), { [CODE_AT]: bytesOf(reaching([SAME])) })
  const shadow = shadowed(held)

  expect(changeReachesItsOwnTargetType.isInput(AT, shadow)).toBe(true)
  expect(changeReachesItsOwnTargetType.isInput(CODE_AT, shadow)).toBe(true)
  expect(changeReachesItsOwnTargetType.isInput(PLAIN_AT, shadow)).toBe(false)
  expect(changeReachesItsOwnTargetType.isInput("akasha/notes.txt", shadow)).toBe(false)
})
