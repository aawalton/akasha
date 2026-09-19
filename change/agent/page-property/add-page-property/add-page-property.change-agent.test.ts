import { expect, test } from "bun:test"
import {
  addPageProperty,
  runChange,
} from "akasha/change/agent/page-property/add-page-property/add-page-property.change-agent.code.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "akasha/wold/wold.text-property.ts"

const BODY = 'export const wold = { propertySlug: "wold" } as const\n'

const TYPE_AT = "akasha/quoin.page-type.ts"

const ALSO_AT = "akasha/quoit.page-type.ts"

const ADD_PAGE_PROPERTY = "change-mechanical/add-page-property"

const REFUSED = "`akasha/quoin.page-type.ts` names no page type"

const GIVEN = {
  at: AT,
  body: BODY,
  partOf: TYPE_AT,
  on: [TYPE_AT],
  required: true,
  many: false,
  default: "held",
} as const

const SAID: Readonly<Record<string, string>> = {
  at: AT,
  body: BODY,
  "part-of": TYPE_AT,
  on: TYPE_AT,
  required: "true",
  many: "false",
  default: "held",
}

test("the whole making is left to the rung reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await addPageProperty(worldRecording(carried, NOTHING_OVER), GIVEN)

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(ADD_PAGE_PROPERTY)
  expect(carried.given).toEqual(GIVEN)
})

test("the rung is the one address this change reaches", async () => {
  const seen: string[] = []
  const world: World = {
    ...worldRecording({ at: "", given: null }, NOTHING_OVER),
    reaching: listing(seen),
  }

  await addPageProperty(world, GIVEN)

  expect(seen).toEqual([ADD_PAGE_PROPERTY])
})

test("a refusal from the rung reached is this change's answer", async () => {
  const world = worldRecording({ at: "", given: null }, refusing(REFUSED))

  const said = await addPageProperty(world, GIVEN)

  expect(said.refused).toBe(REFUSED)
  expect(said.edits).toEqual([])
})

test("the page types declaring the property are handed in one to a line", async () => {
  const carried: Carried = { at: "", given: null }

  await runChange(worldRecording(carried, NOTHING_OVER), {
    ...SAID,
    on: `${TYPE_AT}\n\n  ${ALSO_AT}\n`,
  })

  expect(carried.given).toHaveProperty("on", [TYPE_AT, ALSO_AT])
})

test("`required` and `many` are handed in as text and handed on as truths", async () => {
  const carried: Carried = { at: "", given: null }

  await runChange(worldRecording(carried, NOTHING_OVER), { ...SAID, required: "false" })

  expect(carried.given).toHaveProperty("required", false)
  expect(carried.given).toHaveProperty("many", false)
})

test("a default the caller states nowhere is handed on as nothing", async () => {
  const carried: Carried = { at: "", given: null }
  const { default: gone, ...rest } = SAID

  await runChange(worldRecording(carried, NOTHING_OVER), rest)

  expect(gone).toBe("held")
  expect(carried.given).not.toHaveProperty("default")
})

test("a call naming no page type is refused", async () => {
  const world = worldRecording({ at: "", given: null }, NOTHING_OVER)

  const said = await runChange(world, { ...SAID, on: "\n  \n" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`on` names no page type, so nothing would declare the property")
})

test("an argument this change was handed no value for is refused by its key", async () => {
  const world = worldRecording({ at: "", given: null }, NOTHING_OVER)

  const said = await runChange(world, {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at` names what this change is handed/)
})
