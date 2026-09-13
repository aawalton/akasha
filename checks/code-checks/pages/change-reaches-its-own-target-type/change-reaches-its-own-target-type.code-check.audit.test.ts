import { afterAll, expect, test } from "bun:test"
import { changeReachesItsOwnTargetType } from "akasha/checks/code-checks/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.code-check.audit.code.ts"
import {
  AT,
  CODE_AT,
  CROSS,
  reaching,
  rooted,
  SAME,
  scratch,
} from "akasha/checks/code-checks/pages/change-reaches-its-own-target-type/change-reaches-its-own-target-type.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

test("an audit judges every change in the tree, no change naming one of them", () => {
  const root = tracked(rooted(), { [CODE_AT]: reaching([CROSS]) })

  const said = changeReachesItsOwnTargetType(root)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain(`\`${CROSS}\``)
})

test("an audit lets through a tree where every change reaches its own target type", () => {
  const root = tracked(rooted(), { [CODE_AT]: reaching([SAME]) })

  expect(changeReachesItsOwnTargetType(root)).toEqual([])
})
