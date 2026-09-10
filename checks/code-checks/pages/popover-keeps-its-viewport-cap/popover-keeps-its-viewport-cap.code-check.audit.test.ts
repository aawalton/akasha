import { afterAll, expect, test } from "bun:test"
import { popoverKeepsItsViewportCap } from "./popover-keeps-its-viewport-cap.code-check.audit.code.ts"
import {
  scratch,
  tracked,
  USES_AT,
  WRAPPER,
  WRAPPER_AT,
} from "./popover-keeps-its-viewport-cap.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every tsx in the tree, no change naming one of them", () => {
  const uses = 'const one = <PopoverContent className="max-w-none" />\n'
  const root = tracked({ [WRAPPER_AT]: WRAPPER, [USES_AT]: uses })

  const said = popoverKeepsItsViewportCap(root)

  expect(said.map((one) => one.path)).toEqual([USES_AT])
  expect(said[0]?.reason).toContain("undoes the viewport cap")
})

test("an audit lets through a tree where no named tag undoes its cap", () => {
  const uses = 'const one = <PopoverContent className="p-2" />\n'
  const root = tracked({ [WRAPPER_AT]: WRAPPER, [USES_AT]: uses })

  expect(popoverKeepsItsViewportCap(root)).toEqual([])
})
