import { afterAll, expect, test } from "bun:test"
import { popoverKeepsItsViewportCap } from "akasha/check/code/pages/popover-keeps-its-viewport-cap/popover-keeps-its-viewport-cap.check-code.audit.code.ts"
import {
  rooted,
  scratch,
  USES_AT,
  WRAPPER,
  WRAPPER_AT,
} from "akasha/check/code/pages/popover-keeps-its-viewport-cap/popover-keeps-its-viewport-cap.check-code.decision.test-fixtures.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

test("an audit judges every tsx in the tree, no change naming one of them", () => {
  const uses = 'const one = <PopoverContent className="max-w-none" />\n'
  const root = tracked(rooted({ [WRAPPER_AT]: WRAPPER, [USES_AT]: uses }))

  const said = popoverKeepsItsViewportCap(root)

  expect(said.map((one) => one.path)).toEqual([USES_AT])
  expect(said[0]?.reason).toContain("undoes the viewport cap")
})

test("an audit lets through a tree where no named tag undoes its cap", () => {
  const uses = 'const one = <PopoverContent className="p-2" />\n'
  const root = tracked(rooted({ [WRAPPER_AT]: WRAPPER, [USES_AT]: uses }))

  expect(popoverKeepsItsViewportCap(root)).toEqual([])
})
