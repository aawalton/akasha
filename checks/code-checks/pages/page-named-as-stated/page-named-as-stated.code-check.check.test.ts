import { afterAll, expect, test } from "bun:test"
import type { Change } from "@akasha/pages/change"
import { shadowFor } from "@akasha/pages/shadow"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { landing } from "../../../modules/scratch/check-scratch.module.code.ts"
import { pageNamedAsStated } from "./page-named-as-stated.code-check.check.code.ts"
import {
  LEDGER_AT,
  page,
  rooted,
  scratch,
} from "./page-named-as-stated.code-check.decision.test-fixtures.ts"

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
