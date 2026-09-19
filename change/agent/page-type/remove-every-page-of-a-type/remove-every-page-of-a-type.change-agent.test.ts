import { expect, test } from "bun:test"
import {
  removeEveryPageOfAType,
  runChange,
} from "akasha/change/agent/page-type/remove-every-page-of-a-type/remove-every-page-of-a-type.change-agent.code.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { removeEveryPageOfAType as removeEveryPageOfATypeMechanical } from "akasha/change/mechanical/page-type/remove/remove-every-page-of-a-type/remove-every-page-of-a-type.change-mechanical-page-type.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  catching,
  refusingAt,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const PAGE_TYPE = "sprig"

const RUNG = `${changeMechanicalPageType.slug}/${removeEveryPageOfATypeMechanical.slug}` as const

const REACHED: string[] = []

const NOWHERE: World = worldOf({})

type Reached = { readonly at: string; readonly given: Record<string, unknown> }

test("a page type is handed to the mechanical change taking every page of one away", async () => {
  const seen: Reached[] = []

  const said = await removeEveryPageOfAType(
    { ...NOWHERE, reaching: catching(seen) },
    { pageType: PAGE_TYPE }
  )

  expect(said.refused).toBeNull()
  expect(seen[0]?.at).toBe(RUNG)
  expect(seen[0]?.given).toEqual({ pageType: PAGE_TYPE })
})

test("no change but that one rung is reached", async () => {
  REACHED.length = 0

  await removeEveryPageOfAType({ ...NOWHERE, reaching: listing(REACHED) }, { pageType: PAGE_TYPE })

  expect(REACHED).toEqual([RUNG])
})

test("a count is handed on to that change", async () => {
  const seen: Reached[] = []

  await runChange(
    { ...NOWHERE, reaching: catching(seen) },
    { "page-type": PAGE_TYPE, "at-most": "1" }
  )

  expect(seen[0]?.given).toEqual({ pageType: PAGE_TYPE, atMost: 1 })
})

test("a count left out is handed on as no count", async () => {
  const seen: Reached[] = []

  await runChange({ ...NOWHERE, reaching: catching(seen) }, { "page-type": PAGE_TYPE })

  expect(seen[0]?.given).toEqual({ pageType: PAGE_TYPE })
})

test("a count that is no whole number above nothing is refused here", async () => {
  const held = { ...NOWHERE, reaching: catching([]) }
  const fraction = await removeEveryPageOfAType(held, { pageType: PAGE_TYPE, atMost: 1.5 })
  const text = await runChange(held, { "page-type": PAGE_TYPE, "at-most": "two" })
  const nothing = await runChange(held, { "page-type": PAGE_TYPE, "at-most": "0" })

  expect(fraction.refused ?? "").toContain("`1.5` is no count of pages")
  expect(text.refused ?? "").toContain("`two` is no count of pages")
  expect(nothing.refused ?? "").toContain("`0` is no count of pages")
})

test("a refusal from that change is the refusal this act gives", async () => {
  const said = await removeEveryPageOfAType(
    { ...NOWHERE, reaching: refusingAt([], RUNG) },
    { pageType: PAGE_TYPE }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(RUNG)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange({ ...NOWHERE, reaching: catching([]) }, {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})
