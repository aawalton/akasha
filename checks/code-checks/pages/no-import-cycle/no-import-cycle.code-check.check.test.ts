import { afterAll, expect, test } from "bun:test"
import { noImportCycle } from "akasha/checks/code-checks/pages/no-import-cycle/no-import-cycle.code-check.check.code.ts"
import {
  ALONE,
  AT,
  OUTSIDE,
  patched,
  READS_ONE,
  READS_ONE_OUT,
  READS_TWO,
  rooted,
  scratch,
  TWO_AT,
} from "akasha/checks/code-checks/pages/no-import-cycle/no-import-cycle.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAsked } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(
  before: Readonly<Record<string, string>>,
  after: Readonly<Record<string, string>>
): readonly Judged[] {
  const held = patched(before, after, rooted())
  return noImportCycle(held, shadowAsked(held))
}

test("an import closing a cycle among the paths the change carries is refused through the check", () => {
  const said = judged({ [AT]: ALONE, [TWO_AT]: READS_ONE }, { [AT]: READS_TWO })
  expect(said.map((one) => one.path)).toEqual([AT, TWO_AT])
})

test("a file outside the change is read where the change reaches that file by import", () => {
  const reads = 'import { out } from "./outside.ts"\n'
  const said = judged({ [AT]: ALONE, [OUTSIDE]: READS_ONE_OUT }, { [AT]: reads })
  expect(said.map((one) => one.path)).toEqual([AT, OUTSIDE])
})

test("a change adding no import is refused nothing though a cycle is already there", () => {
  expect(judged({ [AT]: READS_TWO, [TWO_AT]: READS_ONE }, { [AT]: `${READS_TWO}\n` })).toEqual([])
})
