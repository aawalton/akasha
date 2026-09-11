import { afterAll, expect, test } from "bun:test"
import { pagePropertyHasItsFile } from "akasha/checks/code-checks/pages/page-property-has-its-file/page-property-has-its-file.code-check.check.code.ts"
import {
  body,
  CODE,
  over,
  PAGE,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/page-property-has-its-file/page-property-has-its-file.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return pagePropertyHasItsFile(change, cast.shadow)
}

test("the check refuses a page stating a file the change leaves nowhere", () => {
  const held = over(rooted(), [PAGE], { [PAGE]: body(', code: "ts"'), [CODE]: null })

  expect(judged(held)).toEqual([
    { path: PAGE, reason: `states \`code: "ts"\`, and no file stands at ${CODE}` },
  ])
})

test("the check lets through a page whose stated file the change leaves there", () => {
  const held = over(rooted(), [PAGE, CODE], { [PAGE]: body(', code: "ts"') })

  expect(judged(held)).toEqual([])
})

test("the check takes every file the change carries as its input", () => {
  const held = over(rooted(), [PAGE], { [PAGE]: body(', code: "ts"') })
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)

  expect(pagePropertyHasItsFile.isInput(PAGE, cast.shadow)).toBe(true)
  expect(pagePropertyHasItsFile.isInput(CODE, cast.shadow)).toBe(true)
})
