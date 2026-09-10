import { afterAll, expect, test } from "bun:test"
import { noColorLiteral } from "./no-color-literal.code-check.audit.code.ts"
import {
  CODED_AT,
  PALETTE_AT,
  scratch,
  tracked,
} from "./no-color-literal.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree taking every color from a token is let through", () => {
  const root = tracked({ [CODED_AT]: 'export const ACCENT = "var(--yellow)"\n' })
  expect(noColorLiteral(root)).toEqual([])
})

test("a color no change names is refused, and the palette's own home is let through", () => {
  const dressed = ".held {\n  color: #b87b11;\n}\n"
  const written = 'export const ACCENT = "#b87b11"\n'
  const root = tracked({ [CODED_AT]: written, [PALETTE_AT]: dressed })
  const said = noColorLiteral(root)
  expect(said.map((one) => one.path)).toEqual([CODED_AT])
  expect(said[0]?.reason).toContain("#b87b11")
})
