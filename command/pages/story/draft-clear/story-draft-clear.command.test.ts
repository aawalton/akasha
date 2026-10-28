import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyDraftClear } from "akasha/command/pages/story/draft-clear/story-draft-clear.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha story draft-clear",
  from: "",
  writer: null,
  agentId: "an-agent",
}

test("a story's action draft is taken away, so its action bar is empty", () => {
  const cleared: string[] = []
  const answer = storyDraftClear(
    ["--story", "story-played/the-saga"],
    GIVEN,
    (_root, game, action) => {
      cleared.push(`${game}:${String(action)}`)
      return null
    }
  )
  expect(answer.refusals).toEqual([])
  expect(cleared).toEqual(["the-saga:null"])
  expect(answer.report).toEqual(["emptied\tthe-saga\tthe action bar"])
})

test("a story that is not here is refused and named", () => {
  const answer = storyDraftClear(
    ["--story", "nowhere"],
    GIVEN,
    () => "`nowhere` names no played story here"
  )
  expect(answer.refusals.join(" ")).toContain("`nowhere` names no played story here")
})
