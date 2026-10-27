import { expect, test } from "bun:test"
import {
  nothingSaid,
  storyTurnNext,
} from "akasha/command/pages/story/turn/next/story-turn-next.command.code.ts"

const GIVEN = {
  root: "/var/tmp/story-turn-next-test-nowhere",
  calledAs: "akasha story turn next",
  from: "test",
  writer: null,
  agentId: "an-agent",
}

test("a caller holding no role in a story is refused", () => {
  const said = storyTurnNext([], GIVEN, () => null)
  expect(said.refusals.join("\n")).toContain("holds no role in a story")
})

test("a seat of a story no beat is ready for is told to end its turn", () => {
  const seat = { name: "iris-writer-saga", role: "writer", game: "saga" }
  const said = storyTurnNext([], GIVEN, () => seat)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual([nothingSaid("iris-writer-saga")])
})
