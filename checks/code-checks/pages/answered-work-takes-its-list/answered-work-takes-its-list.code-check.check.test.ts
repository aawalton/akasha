import { afterAll, expect, test } from "bun:test"
import { answeredWorkTakesItsList } from "akasha/checks/code-checks/pages/answered-work-takes-its-list/answered-work-takes-its-list.code-check.check.code.ts"
import {
  AT,
  BARE,
  HANDED,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/answered-work-takes-its-list/answered-work-takes-its-list.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { change } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return answeredWorkTakesItsList(held, cast.shadow)
}

test("work taking no list in a text the change carries is refused, naming that path", () => {
  const said = judged(rooted({ [AT]: BARE }), [AT])
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("work taking no list")
})

test("work taking the list in a text the change carries is let through", () => {
  expect(judged(rooted({ [AT]: HANDED }), [AT])).toEqual([])
})

test("a path the change carries that is no text is not judged", () => {
  const at = "akasha/notes.txt"
  expect(judged(rooted({ [at]: BARE }), [at])).toEqual([])
})
