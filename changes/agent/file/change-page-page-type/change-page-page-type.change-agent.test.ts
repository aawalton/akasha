import { expect, test } from "bun:test"
import {
  runChange,
  takes,
} from "akasha/changes/agent/file/change-page-page-type/change-page-page-type.change-agent.code.ts"
import {
  type Caught,
  catching,
  worldRecording,
} from "akasha/changes/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "akasha/kept/one.kept.ts"

const TO = "akasha/spare.page-type.ts"

const MECHANICAL = "change-mechanical/change-page-page-type"

test("the page and the page type it becomes are the two arguments read here", () => {
  expect(takes).toEqual(["at", "to"])
})

test("a call handing in no page is refused", async () => {
  const said = await runChange(worldRecording({ at: "", given: null }), { to: TO })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`at`")
})

test("a call handing in no page type is refused", async () => {
  const said = await runChange(worldRecording({ at: "", given: null }), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`to`")
})

test("the retype is one reach at the mechanical change of the same slug", async () => {
  const seen: Caught[] = []
  const world = { ...worldRecording({ at: "", given: null }), reaching: catching(seen) }

  const said = await runChange(world, { at: AT, to: TO })

  expect(said.refused).toBe(null)
  expect(seen).toEqual([{ at: MECHANICAL, given: { at: AT, to: TO } }])
})
