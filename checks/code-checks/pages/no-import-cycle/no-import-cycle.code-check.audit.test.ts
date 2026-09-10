import { afterAll, expect, test } from "bun:test"
import { noImportCycle } from "./no-import-cycle.code-check.audit.code.ts"
import {
  AT,
  scratch,
  TWO_AT,
  tracked,
} from "./no-import-cycle.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree whose imports come back around nowhere is let through", () => {
  const root = tracked({
    [AT]: 'import { two } from "./two.ts"\n\nexport const one = two\n',
    [TWO_AT]: "export const two = 2\n",
  })
  expect(noImportCycle(root)).toEqual([])
})

test("a cycle no change names is refused, because an audit reads the whole tree", () => {
  const root = tracked({
    [AT]: 'import { two } from "./two.ts"\n\nexport const one = two\n',
    [TWO_AT]: 'import { one } from "./one.ts"\n\nexport const two = one\n',
  })
  expect(noImportCycle(root).map((one) => one.path)).toEqual([AT, TWO_AT])
})
