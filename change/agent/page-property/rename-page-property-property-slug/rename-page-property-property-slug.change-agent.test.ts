import { expect, test } from "bun:test"
import {
  renamePagePropertyPropertySlug,
  runChange,
} from "akasha/change/agent/page-property/rename-page-property-property-slug/rename-page-property-property-slug.change-agent.code.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "akasha/wold/wold.file-property.ts"

const TO = "wold-file"

const RENAME_PROPERTY_SLUG = "change-mechanical/rename-page-property-property-slug"

const REFUSED = "`wold-file` is the property slug that page already carries"

test("the whole rename is left to the rung reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await renamePagePropertyPropertySlug(worldRecording(carried, NOTHING_OVER), {
    at: AT,
    to: TO,
  })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(RENAME_PROPERTY_SLUG)
  expect(carried.given).toEqual({ at: AT, to: TO })
})

test("the rung is the one address this change reaches", async () => {
  const seen: string[] = []
  const world: World = {
    ...worldRecording({ at: "", given: null }, NOTHING_OVER),
    reaching: listing(seen),
  }

  await renamePagePropertyPropertySlug(world, { at: AT, to: TO })

  expect(seen).toEqual([RENAME_PROPERTY_SLUG])
})

test("a refusal from the rung reached is this change's answer", async () => {
  const world = worldRecording({ at: "", given: null }, refusing(REFUSED))

  const said = await renamePagePropertyPropertySlug(world, { at: AT, to: TO })

  expect(said.refused).toBe(REFUSED)
  expect(said.edits).toEqual([])
})

test("the count and the former key handed in are handed to the rung", async () => {
  const carried: Carried = { at: "", given: null }

  await runChange(worldRecording(carried, NOTHING_OVER), {
    at: AT,
    to: TO,
    "at-most": "2",
    was: "wold",
  })

  expect(carried.given).toEqual({ at: AT, to: TO, atMost: 2, was: "wold" })
})

test("a run handed neither a count nor a former key hands the rung nothing for either", async () => {
  const carried: Carried = { at: "", given: null }

  await runChange(worldRecording(carried, NOTHING_OVER), { at: AT, to: TO })

  expect(carried.given).toEqual({ at: AT, to: TO, atMost: null, was: null })
})

test("a count that is no whole number above nothing is refused", async () => {
  const world = worldRecording({ at: "", given: null }, NOTHING_OVER)

  const said = await runChange(world, { at: AT, to: TO, "at-most": "none" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`none` is no count of pages, a count being a whole number above nothing"
  )
})

test("an argument this change was handed no value for is refused by its key", async () => {
  const world = worldRecording({ at: "", given: null }, NOTHING_OVER)

  const said = await runChange(world, { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`to` names what this change is handed/)
})
