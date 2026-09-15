import { afterAll, expect, test } from "bun:test"
import { pageNamedAsStated } from "akasha/check/code/pages/page-named-as-stated/page-named-as-stated.check-code.check.code.ts"
import {
  LEDGER_AT,
  page,
  rooted,
  scratch,
} from "akasha/check/code/pages/page-named-as-stated/page-named-as-stated.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import { landing } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(over: Change): readonly Judged[] {
  const cast = shadowFor(over)
  if ("refused" in cast) throw new Error(cast.refused)
  return pageNamedAsStated(over, cast.shadow)
}

test("the check refuses a page the change carries whose file is not named as it states", () => {
  const held = landing(rooted(["code"]), { [LEDGER_AT]: bytesOf(page("ledges", "module")) })

  const said = judged(held)

  expect(said.map((one) => one.path)).toEqual([LEDGER_AT])
  expect(said[0]?.reason).toContain("names itself `ledges`")
})

test("the check lets through a page the change carries that is named as it states", () => {
  const held = landing(rooted(["code"]), { [LEDGER_AT]: bytesOf(page("ledger", "module")) })

  expect(judged(held)).toEqual([])
})

test("the check takes every file the change carries as its input", () => {
  const held = landing(rooted(["code"]), { [LEDGER_AT]: bytesOf(page("ledger", "module")) })
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)

  expect(pageNamedAsStated.isInput(LEDGER_AT, cast.shadow)).toBe(true)
  expect(pageNamedAsStated.isInput("akasha/notes.txt", cast.shadow)).toBe(true)
})
