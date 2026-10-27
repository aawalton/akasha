import { expect, test } from "bun:test"
import { gameMaster } from "akasha/agent/role/pages/game-master/game-master.role.ts"
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

const HANDED: string[] = []

const handOut = async (_root: string, game: string) => {
  HANDED.push(game)
  return ["handed again\tiris-writer-saga"]
}

test("a caller holding no role in a story is refused", async () => {
  const said = await storyTurnNext([], GIVEN, () => null, handOut)
  expect(said.refusals.join("\n")).toContain("holds no role in a story")
})

test("a seat of a story no beat is ready for is told to end its turn, and hands nothing out", async () => {
  const seat = { name: "iris-writer-saga", role: "writer", game: "saga" }
  const said = await storyTurnNext([], GIVEN, () => seat, handOut)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual([nothingSaid("iris-writer-saga")])
  expect(HANDED).toEqual([])
})

test("a game master with no beat to restate hands each step's ready beat out again", async () => {
  const seat = { name: "iris-game-master-saga", role: gameMaster.slug, game: "saga" }
  const said = await storyTurnNext([], GIVEN, () => seat, handOut)
  expect(said.report).toEqual([nothingSaid(seat.name), "handed again\tiris-writer-saga"])
  expect(HANDED).toEqual(["saga"])
})
