import { expect, test } from "bun:test"
import {
  removePageProperty,
  runChange,
} from "akasha/change/agent/page-property/remove-page-property/remove-page-property.change-agent.code.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const PROPERTY = "text-property/wold"

const REMOVE_PAGE_PROPERTY = "change-mechanical/remove-page-property"

const REFUSED = "`text-property/wold` names no page property, so no property is taken away"

test("the whole removal is left to the rung reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await removePageProperty(worldRecording(carried, NOTHING_OVER), {
    property: PROPERTY,
  })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(REMOVE_PAGE_PROPERTY)
  expect(carried.given).toEqual({ property: PROPERTY })
})

test("the rung is the one address this change reaches", async () => {
  const seen: string[] = []
  const world: World = {
    ...worldRecording({ at: "", given: null }, NOTHING_OVER),
    reaching: listing(seen),
  }

  await removePageProperty(world, { property: PROPERTY })

  expect(seen).toEqual([REMOVE_PAGE_PROPERTY])
})

test("a refusal from the rung reached is this change's answer", async () => {
  const world = worldRecording({ at: "", given: null }, refusing(REFUSED))

  const said = await removePageProperty(world, { property: PROPERTY })

  expect(said.refused).toBe(REFUSED)
  expect(said.edits).toEqual([])
})

test("the property handed in is handed to the rung", async () => {
  const carried: Carried = { at: "", given: null }

  await runChange(worldRecording(carried, NOTHING_OVER), { property: PROPERTY })

  expect(carried.given).toEqual({ property: PROPERTY })
})

test("an argument this change was handed no value for is refused by its key", async () => {
  const world = worldRecording({ at: "", given: null }, NOTHING_OVER)

  const said = await runChange(world, {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`property` names what this change is handed/)
})
