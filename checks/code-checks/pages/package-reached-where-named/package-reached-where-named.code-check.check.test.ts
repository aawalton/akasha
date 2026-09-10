import { afterAll, expect, test } from "bun:test"
import { shadowAt } from "@akasha/pages/shadow"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { packageReachedWhereNamed } from "./package-reached-where-named.code-check.check.code.ts"
import {
  HIDDEN_REACH,
  NAMED_REACH,
  OUTSIDE_AT,
  rooted,
  scratch,
} from "./package-reached-where-named.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a reach the manifest does not name, in a file the change carries, is refused", () => {
  const root = rooted({ [OUTSIDE_AT]: HIDDEN_REACH })
  const said = packageReachedWhereNamed(change(root, [OUTSIDE_AT]), shadowAt(root))
  expect(said.map((one) => one.path)).toEqual([OUTSIDE_AT])
  expect(said[0]?.reason).toContain("@akasha/held")
})

test("a reach the manifest names is let through", () => {
  const root = rooted({ [OUTSIDE_AT]: NAMED_REACH })
  expect(packageReachedWhereNamed(change(root, [OUTSIDE_AT]), shadowAt(root))).toEqual([])
})
