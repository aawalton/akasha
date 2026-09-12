import { afterAll, expect, test } from "bun:test"
import { answeredWorkTakesItsList } from "akasha/checks/code-checks/pages/answered-work-takes-its-list/answered-work-takes-its-list.code-check.audit.code.ts"
import {
  AT,
  BARE,
  HANDED,
  scratch,
  tracked,
} from "akasha/checks/code-checks/pages/answered-work-takes-its-list/answered-work-takes-its-list.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree whose work takes the list is let through", () => {
  expect(answeredWorkTakesItsList(tracked({ [AT]: HANDED }))).toEqual([])
})

test("work taking no list that no change names is refused, an audit reading the whole tree", () => {
  const said = answeredWorkTakesItsList(tracked({ [AT]: BARE }))
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("work taking no list")
})
