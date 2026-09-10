import { afterAll, expect, test } from "bun:test"
import { noGlobalInAModule } from "./no-global-in-a-module.code-check.audit.code.ts"
import {
  CARRIES,
  CLEAN,
  DECLARED_AT,
  LIFTED,
  ONE_AT,
  scratch,
  TWO_AT,
  tracked,
} from "./no-global-in-a-module.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree whose modules declare no global is let through", () => {
  const root = tracked({ [ONE_AT]: CLEAN, [DECLARED_AT]: LIFTED })
  expect(noGlobalInAModule(root)).toEqual([])
})

test("a block no change carries is refused, because an audit reads the whole tree", () => {
  const root = tracked({ [ONE_AT]: CLEAN, [TWO_AT]: CARRIES, [DECLARED_AT]: LIFTED })
  const said = noGlobalInAModule(root)
  expect(said.map((one) => one.path)).toEqual([TWO_AT])
})
