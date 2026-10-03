import { expect, test } from "bun:test"
import { runChange } from "akasha/change/agent/page-type/fold-beats-into-file/fold-beats-into-file.change-agent.code.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { foldBeatsIntoFile as foldBeatsIntoFileMechanical } from "akasha/change/mechanical/page-type/move/fold-beats-into-file/fold-beats-into-file.change-mechanical-page-type.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { worldOfType } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const TYPE = "story-chapter-written"

test("the one change reached is the mechanical change folding beats on a page type", async () => {
  const seen: string[] = []
  const world = worldOfType(TYPE, {}, [], new Map(), listing(seen))

  const said = await runChange(world, { "page-type": TYPE })

  expect(said.refused).toBeNull()
  expect(seen).toEqual([`${changeMechanicalPageType.slug}/${foldBeatsIntoFileMechanical.slug}`])
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const world = worldOfType(TYPE, {}, [], new Map(), listing([]))

  const said = await runChange(world, {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})

test("a count that is no whole number above nothing is refused", async () => {
  const world = worldOfType(TYPE, {}, [], new Map(), listing([]))

  const said = await runChange(world, { "page-type": TYPE, "at-most": "none" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("is no count of pages")
})
