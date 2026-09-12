import { afterAll, expect, test } from "bun:test"
import { invariantRestatedOnAPartNarrowsIt } from "akasha/checks/code-checks/pages/invariant-restated-on-a-part-narrows-it/invariant-restated-on-a-part-narrows-it.code-check.audit.code.ts"
import {
  BELOW_AT,
  OTHER,
  rooted,
  SHARED,
  scratch,
} from "akasha/checks/code-checks/pages/invariant-restated-on-a-part-narrows-it/invariant-restated-on-a-part-narrows-it.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"

afterAll(scratch.sweep)

test("an audit judges every page in the tree, no change naming one of them", () => {
  const said = invariantRestatedOnAPartNarrowsIt(tracked(rooted([SHARED], [SHARED])))

  expect(said.map((one) => one.path)).toEqual([BELOW_AT])
  expect(said[0]?.reason).toContain(SHARED)
})

test("an audit lets through a tree whose parts state invariants of their own", () => {
  expect(invariantRestatedOnAPartNarrowsIt(tracked(rooted([OTHER], [SHARED])))).toEqual([])
})
