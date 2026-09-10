import { afterAll, expect, test } from "bun:test"
import { noCodeComments } from "./no-code-comments.code-check.audit.code.ts"
import {
  AT,
  STYLE_AT,
  scratch,
  tracked,
} from "./no-code-comments.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree carrying no comment anywhere is let through", () => {
  const root = tracked({ [AT]: "export const one = 1\n", [STYLE_AT]: ".held {\n}\n" })
  expect(noCodeComments(root)).toEqual([])
})

test("a comment no change names is refused, in a text and in a stylesheet alike", () => {
  const root = tracked({
    [AT]: "// this holds the count\nexport const one = 1\n",
    [STYLE_AT]: "/* this holds the color */\n.held {\n}\n",
  })
  expect(noCodeComments(root).map((one) => one.path)).toEqual([STYLE_AT, AT])
})
