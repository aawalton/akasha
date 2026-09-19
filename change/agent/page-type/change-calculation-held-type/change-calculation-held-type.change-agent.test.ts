import { expect, test } from "bun:test"
import {
  changeCalculationHeldType,
  runChange,
} from "akasha/change/agent/page-type/change-calculation-held-type/change-calculation-held-type.change-agent.code.ts"
import { changeCalculationHeldType as changeCalculationHeldTypeMechanical } from "akasha/change/mechanical/page-type/change/change-calculation-held-type/change-calculation-held-type.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { ledgerAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  type Caught,
  catching,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const RUNG = `${changeMechanicalPageType.slug}/${changeCalculationHeldTypeMechanical.slug}` as const

const NOWHERE = "/nowhere"

test("the one change reached is the mechanical change acting on a page type", async () => {
  const seen: string[] = []

  const said = await changeCalculationHeldType(
    ledgerAt(NOWHERE, () => null, listing(seen)),
    {}
  )

  expect(said.refused).toBeNull()
  expect(seen).toEqual([RUNG])
})

test("the folder named is handed on to the change reached", async () => {
  const seen: Caught[] = []

  await runChange(
    ledgerAt(NOWHERE, () => null, catching(seen)),
    { under: "thrumming/" }
  )

  expect(seen).toEqual([{ at: RUNG, given: { under: "thrumming/" } }])
})

test("a run naming no folder hands no folder on", async () => {
  const seen: Caught[] = []

  await runChange(
    ledgerAt(NOWHERE, () => null, catching(seen)),
    {}
  )

  expect(seen).toEqual([{ at: RUNG, given: {} }])
})
