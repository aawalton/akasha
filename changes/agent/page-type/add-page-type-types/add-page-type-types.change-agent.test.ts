import { expect, test } from "bun:test"
import {
  addPageTypeTypes,
  runChange,
} from "akasha/changes/agent/page-type/add-page-type-types/add-page-type-types.change-agent.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  catching,
  refusingAt,
  worldOf,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import { listing } from "akasha/changes/runners/pages/test-change-running/test-change-running.change-runner.code.ts"

const AT = "thrumming/moots/moot.page-type.ts"

const RUNG = "change-mechanical-page-type/add-page-type-types"

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
