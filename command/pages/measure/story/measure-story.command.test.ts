import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { measureStory } from "akasha/command/pages/measure/story/measure-story.command.code.ts"

const CALLED_AS = "akasha measure story"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

test("a flag this takes nothing of is refused", () => {
  const said = measureStory(["--nope"], GIVEN).refusals
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
})

test("a window that is neither a count nor a period is refused", () => {
  const said = measureStory(["--last", "5y"], GIVEN).refusals
  expect(said.length).toBe(1)
  expect(said[0]).toContain("5y")
})

test("a call naming no window answers the table, headed by what each phase says", () => {
  const answer = measureStory([], GIVEN)
  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toMatch(/^story +count +wall mid/)
})
