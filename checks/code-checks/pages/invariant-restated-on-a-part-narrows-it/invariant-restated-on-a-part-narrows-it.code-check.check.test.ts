import { afterAll, expect, test } from "bun:test"
import { invariantRestatedOnAPartNarrowsIt } from "akasha/checks/code-checks/pages/invariant-restated-on-a-part-narrows-it/invariant-restated-on-a-part-narrows-it.code-check.check.code.ts"
import {
  BELOW_AT,
  belowText,
  OTHER,
  rooted,
  SHARED,
  scratch,
} from "akasha/checks/code-checks/pages/invariant-restated-on-a-part-narrows-it/invariant-restated-on-a-part-narrows-it.code-check.decision.test-fixtures.ts"
import {
  judgingBy,
  landing,
  shadowed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { bytesOf } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(invariantRestatedOnAPartNarrowsIt)

const BODY = bytesOf(belowText([SHARED]))

test("the check refuses a part the change carries that restates the page above", () => {
  const said = judging(landing(rooted([SHARED], [SHARED]), { [BELOW_AT]: BODY }))

  expect(said.map((one) => one.path)).toEqual([BELOW_AT])
})

test("the check lets through a part stating an invariant of its own", () => {
  expect(judging(landing(rooted([OTHER], [SHARED]), { [BELOW_AT]: BODY }))).toEqual([])
})

test("the check takes a page as its input and no file that is no page", () => {
  const shadow = shadowed(landing(rooted([SHARED], [SHARED]), { [BELOW_AT]: BODY }))

  expect(invariantRestatedOnAPartNarrowsIt.isInput(BELOW_AT, shadow)).toBe(true)
  expect(invariantRestatedOnAPartNarrowsIt.isInput("akasha/held.ts", shadow)).toBe(false)
})
