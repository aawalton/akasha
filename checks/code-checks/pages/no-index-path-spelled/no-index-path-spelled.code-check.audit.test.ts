import { afterAll, expect, test } from "bun:test"
import { noIndexPathSpelled } from "./no-index-path-spelled.code-check.audit.code.ts"
import {
  AT,
  HELD,
  scratch,
  tracked,
} from "./no-index-path-spelled.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree spelling no path into the index is let through", () => {
  expect(noIndexPathSpelled(tracked({ [HELD]: "export const one = 1\n" }))).toEqual([])
})

test("a spelling no change names is refused, because an audit reads the whole tree", () => {
  const root = tracked({ [HELD]: `const at = "${AT}/identity/module/slug"\n` })
  const said = noIndexPathSpelled(root)
  expect(said.map((one) => one.path)).toEqual([HELD])
  expect(said[0]?.reason).toContain("spells a path into the index")
})
