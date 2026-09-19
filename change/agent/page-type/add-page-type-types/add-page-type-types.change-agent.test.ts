import { expect, test } from "bun:test"
import {
  addPageTypeTypes,
  runChange,
} from "akasha/change/agent/page-type/add-page-type-types/add-page-type-types.change-agent.code.ts"
import { addPageTypeTypes as addPageTypeTypesMechanical } from "akasha/change/mechanical/page-type/add/add-page-type-types/add-page-type-types.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  catching,
  refusingAt,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "thrumming/moots/moot.page-type.ts"

const RUNG = `${changeMechanicalPageType.slug}/${addPageTypeTypesMechanical.slug}` as const

const REACHED: string[] = []

const NOWHERE: World = worldOf({})

type Reached = { readonly at: string; readonly given: Record<string, unknown> }

test("the page type's own file is handed to the mechanical change turning one over", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes({ ...NOWHERE, reaching: catching(seen) }, { at: AT })

  expect(said.refused).toBeNull()
  expect(seen[0]?.at).toBe(RUNG)
  expect(seen[0]?.given).toEqual({ at: AT })
})

test("no change but that one rung is reached", async () => {
  REACHED.length = 0

  await addPageTypeTypes({ ...NOWHERE, reaching: listing(REACHED) }, { at: AT })

  expect(REACHED).toEqual([RUNG])
})

test("a refusal from that change is the refusal this act gives", async () => {
  const said = await addPageTypeTypes({ ...NOWHERE, reaching: refusingAt([], RUNG) }, { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(RUNG)
})

test("arguments holding no path are refused by the name of the argument", async () => {
  const said = await runChange({ ...NOWHERE, reaching: catching([]) }, {})

  expect(said.refused ?? "").toMatch(/`at`/)
})
