import { expect, test } from "bun:test"
import {
  addPagePropertyTypes,
  runChange,
} from "akasha/change/agent/page-type/add-page-property-types/add-page-property-types.change-agent.code.ts"
import { addPagePropertyTypes as addPagePropertyTypesMechanical } from "akasha/change/mechanical/page-type/add/add-page-property-types/add-page-property-types.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { ledgerAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  type Caught,
  catching,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const RUNG = `${changeMechanicalPageType.slug}/${addPagePropertyTypesMechanical.slug}` as const

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
