import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { noCodeComments } from "./no-code-comments.code-check.check.code.ts"
import {
  AT,
  rooted,
  STYLE_AT,
  scratch,
} from "./no-code-comments.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const PROSE = "// this holds the count\nexport const one = 1\n"

const DRESSED = "/* this holds the color */\n.held {\n  color: red;\n}\n"

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noCodeComments(held, cast.shadow)
}

test("prose in a text the change carries is refused, and the refusal names that path", () => {
  const said = judged(rooted({ [AT]: PROSE }), [AT])
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("line 1")
})

test("prose in a stylesheet the change carries is refused too", () => {
  const said = judged(rooted({ [STYLE_AT]: DRESSED }), [STYLE_AT])
  expect(said.map((one) => one.path)).toEqual([STYLE_AT])
})

test("a path the change carries that is neither text nor stylesheet is not judged", () => {
  const at = "akasha/notes.md"
  expect(judged(rooted({ [at]: PROSE }), [at])).toEqual([])
})
