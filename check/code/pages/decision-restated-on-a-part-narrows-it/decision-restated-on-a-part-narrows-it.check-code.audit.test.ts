import { afterAll, expect, test } from "bun:test"
import { decisionRestatedOnAPartNarrowsIt } from "akasha/check/code/pages/decision-restated-on-a-part-narrows-it/decision-restated-on-a-part-narrows-it.check-code.audit.code.ts"
import {
  BELOW_AT,
  OTHER,
  rooted,
  SHARED,
  scratch,
} from "akasha/check/code/pages/decision-restated-on-a-part-narrows-it/decision-restated-on-a-part-narrows-it.check-code.decision.test-fixtures.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

test("an audit judges every page in the tree, no change naming one of them", () => {
  const said = decisionRestatedOnAPartNarrowsIt(tracked(rooted([SHARED], [SHARED])))

  expect(said.map((one) => one.path)).toEqual([BELOW_AT])
  expect(said[0]?.reason).toContain(SHARED)
})

test("an audit lets through a tree whose parts state decisions of their own", () => {
  expect(decisionRestatedOnAPartNarrowsIt(tracked(rooted([OTHER], [SHARED])))).toEqual([])
})
