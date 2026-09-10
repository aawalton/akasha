import { afterAll, expect, test } from "bun:test"
import { noUnparsedBoundaryRead } from "./no-unparsed-boundary-read.code-check.audit.code.ts"
import {
  AT,
  READ_AND_USED,
  scratch,
  tracked,
} from "./no-unparsed-boundary-read.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree reading across no boundary is let through", () => {
  expect(noUnparsedBoundaryRead(tracked({ [AT]: "export const one = 1\n" }))).toEqual([])
})

test("an unparsed read no change names is refused, an audit reading the whole tree", () => {
  const said = noUnparsedBoundaryRead(tracked({ [AT]: READ_AND_USED }))
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("json-parse")
})
