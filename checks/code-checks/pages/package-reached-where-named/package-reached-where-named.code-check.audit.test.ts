import { afterAll, expect, test } from "bun:test"
import { packageReachedWhereNamed } from "./package-reached-where-named.code-check.audit.code.ts"
import {
  HIDDEN_REACH,
  NAMED_REACH,
  OUTSIDE_AT,
  scratch,
  tracked,
} from "./package-reached-where-named.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree reaching a package only where its manifest names is let through", () => {
  expect(packageReachedWhereNamed(tracked({ [OUTSIDE_AT]: NAMED_REACH }))).toEqual([])
})

test("a reach no change names is refused, because an audit reads the whole tree", () => {
  const said = packageReachedWhereNamed(tracked({ [OUTSIDE_AT]: HIDDEN_REACH }))
  expect(said.map((one) => one.path)).toEqual([OUTSIDE_AT])
  expect(said[0]?.reason).toContain("@akasha/held")
})
