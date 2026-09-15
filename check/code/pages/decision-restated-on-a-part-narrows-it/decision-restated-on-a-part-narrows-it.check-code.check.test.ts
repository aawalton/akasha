import { afterAll, expect, test } from "bun:test"
import { decisionRestatedOnAPartNarrowsIt } from "akasha/check/code/pages/decision-restated-on-a-part-narrows-it/decision-restated-on-a-part-narrows-it.check-code.check.code.ts"
import {
  BELOW_AT,
  belowText,
  OTHER,
  rooted,
  SHARED,
  scratch,
} from "akasha/check/code/pages/decision-restated-on-a-part-narrows-it/decision-restated-on-a-part-narrows-it.check-code.decision.test-fixtures.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  judgingBy,
  landing,
  shadowed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(decisionRestatedOnAPartNarrowsIt)

const BODY = bytesOf(belowText([SHARED]))

test("the check refuses a part the change carries that restates the page above", () => {
  const said = judging(landing(rooted([SHARED], [SHARED]), { [BELOW_AT]: BODY }))

  expect(said.map((one) => one.path)).toEqual([BELOW_AT])
})

test("the check lets through a part stating an decision of its own", () => {
  expect(judging(landing(rooted([OTHER], [SHARED]), { [BELOW_AT]: BODY }))).toEqual([])
})

test("the check takes a page as its input and no file that is no page", () => {
  const shadow = shadowed(landing(rooted([SHARED], [SHARED]), { [BELOW_AT]: BODY }))

  expect(decisionRestatedOnAPartNarrowsIt.isInput(BELOW_AT, shadow)).toBe(true)
  expect(decisionRestatedOnAPartNarrowsIt.isInput("akasha/held.ts", shadow)).toBe(false)
})
