import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { noColorLiteral } from "./no-color-literal.code-check.code.ts"
import {
  CODED_AT,
  DRESSED_AT,
  PAGE_AT,
  rooted,
  scratch,
} from "./no-color-literal.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const WRITTEN = 'export const ACCENT = "#b87b11"\n'

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noColorLiteral(held, cast.shadow)
}

test("a color a text the change carries writes out is refused, and names that path", () => {
  const said = judged(rooted({ [CODED_AT]: WRITTEN }), [CODED_AT])
  expect(said.map((one) => one.path)).toEqual([CODED_AT])
  expect(said[0]?.reason).toContain("#b87b11")
})

test("a color a stylesheet the change carries writes out is refused too", () => {
  const body = ".held {\n  color: #b87b11;\n}\n"
  const said = judged(rooted({ [DRESSED_AT]: body }), [DRESSED_AT])
  expect(said.map((one) => one.path)).toEqual([DRESSED_AT])
})

test("a page the change carries states a value and dresses nothing, so nothing judges it", () => {
  const body = 'export const held = { slug: "held", accent: "#b87b11" }\n'
  expect(judged(rooted({ [PAGE_AT]: body }), [PAGE_AT])).toEqual([])
})

test("a body the change carries that is neither text nor stylesheet is passed over", () => {
  const at = "alan/web/notes.md"
  expect(judged(rooted({ [at]: WRITTEN }), [at])).toEqual([])
})
