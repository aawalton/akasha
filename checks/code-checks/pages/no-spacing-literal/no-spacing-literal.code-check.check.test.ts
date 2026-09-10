import { afterAll, expect, test } from "bun:test"
import { shadowAt } from "@akasha/pages/shadow"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { noSpacingLiteral } from "./no-spacing-literal.code-check.check.code.ts"
import { HELD_AT, rooted, scratch } from "./no-spacing-literal.code-check.decision.test-fixtures.ts"

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
