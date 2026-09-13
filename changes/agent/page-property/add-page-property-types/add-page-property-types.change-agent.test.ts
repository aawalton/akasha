import { expect, test } from "bun:test"
import {
  addPagePropertyTypes,
  runChange,
} from "akasha/changes/agent/page-property/add-page-property-types/add-page-property-types.change-agent.code.ts"
import { ledgerAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  type Caught,
  catching,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"

const RUNG = "change-mechanical-page-type/add-page-property-types"

const KIND = "boolean-property"

const NOWHERE = "/nowhere"

test("the one change reached is the mechanical change acting on a page type", async () => {
  const seen: string[] = []

  const said = await addPagePropertyTypes(
    ledgerAt(NOWHERE, () => null, listing(seen)),
    {
      pageType: KIND,
    }
  )

  expect(said.refused).toBeNull()
  expect(seen).toEqual([RUNG])
})

test("the page type and the folder named are handed on to the change reached", async () => {
  const seen: Caught[] = []

  await runChange(
    ledgerAt(NOWHERE, () => null, catching(seen)),
    {
      "page-type": KIND,
      under: "thrumming/",
    }
  )

  expect(seen).toEqual([{ at: RUNG, given: { pageType: KIND, under: "thrumming/" } }])
})

test("a run naming no folder hands no folder on", async () => {
  const seen: Caught[] = []

  await runChange(
    ledgerAt(NOWHERE, () => null, catching(seen)),
    { "page-type": KIND }
  )

  expect(seen).toEqual([{ at: RUNG, given: { pageType: KIND } }])
})

test("a run handed no page type is refused by the name of that argument", async () => {
  const seen: Caught[] = []

  const said = await runChange(
    ledgerAt(NOWHERE, () => null, catching(seen)),
    {}
  )

  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
  expect(seen).toEqual([])
})
