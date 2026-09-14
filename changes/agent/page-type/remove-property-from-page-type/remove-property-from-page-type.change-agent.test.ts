import { expect, test } from "bun:test"
import {
  removePropertyFromPageType,
  runChange,
} from "akasha/changes/agent/page-type/remove-property-from-page-type/remove-property-from-page-type.change-agent.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  catching,
  refusingAt,
  worldOf,
} from "akasha/changes/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const OWNER_AT = "thrumming/moots/moot.page-type.ts"

const PROPERTY = "moot-property/sung-at"

const RUNG = "change-mechanical-page-type/remove-property-from-page-type"

const REACHED: string[] = []

const NOWHERE: World = worldOf({})

type Reached = { readonly at: string; readonly given: Record<string, unknown> }

test("a page type is handed to the mechanical change taking a property off one", async () => {
  const seen: Reached[] = []

  const said = await removePropertyFromPageType(
    { ...NOWHERE, reaching: catching(seen) },
    { at: OWNER_AT, property: PROPERTY }
  )

  expect(said.refused).toBeNull()
  expect(seen[0]?.at).toBe(RUNG)
  expect(seen[0]?.given).toEqual({ at: OWNER_AT, property: PROPERTY })
})

test("no change but that one rung is reached", async () => {
  REACHED.length = 0

  await removePropertyFromPageType(
    { ...NOWHERE, reaching: listing(REACHED) },
    { at: OWNER_AT, property: PROPERTY }
  )

  expect(REACHED).toEqual([RUNG])
})

test("a refusal from that change is the refusal this act gives", async () => {
  const said = await removePropertyFromPageType(
    { ...NOWHERE, reaching: refusingAt([], RUNG) },
    { at: OWNER_AT, property: PROPERTY }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(RUNG)
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange({ ...NOWHERE, reaching: catching([]) }, { at: OWNER_AT })

  expect(said.refused ?? "").toContain("property")
})
