import { afterAll, expect, test } from "bun:test"
import { noSpacingLiteral } from "./no-spacing-literal.code-check.audit.code.ts"
import {
  HELD_AT,
  scratch,
  tracked,
} from "./no-spacing-literal.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree whose Swift takes its dimensions from steps is let through", () => {
  expect(noSpacingLiteral(tracked({ [HELD_AT]: "VStack(spacing: SPACING_2) {\n}\n" }))).toEqual([])
})

test("a dimension no change names is refused, because an audit reads the whole tree", () => {
  const said = noSpacingLiteral(tracked({ [HELD_AT]: "VStack(spacing: 8) {\n}\n" }))
  expect(said.map((one) => one.path)).toEqual([HELD_AT])
  expect(said[0]?.reason).toContain("spacing 8")
})
