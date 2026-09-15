import { afterAll, expect, test } from "bun:test"
import {
  ONE,
  PAGE_TYPE,
  restating,
  typing,
} from "akasha/check/code/pages/key-names-one-property/key-names-one-property.check-code.decision.test-fixtures.ts"
import { restatementNarrowsSomething } from "akasha/check/code/pages/restatement-narrows-something/restatement-narrows-something.check-code.check.code.ts"
import {
  rooted,
  scratch,
} from "akasha/check/code/pages/restatement-narrows-something/restatement-narrows-something.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  landing,
  pathFor,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return restatementNarrowsSomething(change, cast.shadow)
}

test("the check refuses a restatement the change carries that narrows nothing", () => {
  const said = restating(
    rooted(),
    judged,
    { required: true, many: false },
    { required: true, many: false }
  )

  expect(said.map((one) => one.path)).toEqual([pathFor(PAGE_TYPE, "under")])
  expect(said[0]?.reason).toContain("narrows nothing")
})

test("the check lets through a restatement that narrows what it restates", () => {
  const said = restating(
    rooted(),
    judged,
    { required: false, many: false },
    { required: true, many: false }
  )

  expect(said).toEqual([])
})

test("the check takes a page as its input and no other body", () => {
  const root = rooted()
  const at = pathFor(PAGE_TYPE, "one")
  const cast = shadowFor(landing(root, { [at]: typing(root, "one", ONE, null, []) }))
  if ("refused" in cast) throw new Error(cast.refused)
  const beside = "akasha/one.module.code.ts"

  expect(restatementNarrowsSomething.isInput(at, cast.shadow)).toBe(true)
  expect(restatementNarrowsSomething.isInput(beside, cast.shadow)).toBe(false)
})
