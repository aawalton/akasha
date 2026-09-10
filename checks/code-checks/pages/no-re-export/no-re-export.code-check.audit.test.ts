import { afterAll, expect, test } from "bun:test"
import { noReExport } from "./no-re-export.code-check.audit.code.ts"
import { AT, SENT, scratch, tracked } from "./no-re-export.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree whose files export only what they declared is let through", () => {
  expect(noReExport(tracked({ [AT]: "export function one(): number {\n  return 1\n}\n" }))).toEqual(
    []
  )
})

test("a re-export no change names is refused, because an audit reads the whole tree", () => {
  const said = noReExport(tracked({ [AT]: SENT }))
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`./b.ts`")
})
