import { afterAll, expect, test } from "bun:test"
import { noSpacingLiteral } from "akasha/checks/code-checks/pages/no-spacing-literal/no-spacing-literal.code-check.check.code.ts"
import {
  HELD_AT,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/no-spacing-literal/no-spacing-literal.code-check.decision.test-fixtures.ts"
import { change } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("a dimension in Swift the change carries is refused, naming that path", () => {
  const root = rooted({ [HELD_AT]: "VStack(spacing: 8) {\n}\n" })
  const said = noSpacingLiteral(change(root, [HELD_AT]), shadowAt(root))
  expect(said.map((one) => one.path)).toEqual([HELD_AT])
  expect(said[0]?.reason).toContain("spacing 8")
})

test("a path the change carries that is no Swift is not judged", () => {
  const at = "alan/web/held/held.module.code.ts"
  const root = rooted({ [at]: "const held = { spacing: 8 }\n" })
  expect(noSpacingLiteral(change(root, [at]), shadowAt(root))).toEqual([])
})
