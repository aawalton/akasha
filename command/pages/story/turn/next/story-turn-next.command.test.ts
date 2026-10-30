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
  const story = () => ({ title: "Saga", master: seat.name })
  const said = await storyTurnNext([], GIVEN, () => seat, handOut, story)
  expect(said.report).toEqual([nothingSaid(seat.name), "handed again\tiris-writer-saga"])
  expect(HANDED).toEqual(["saga"])
})

test("a one-seat story's game master is served its checklist, and hands no beat out", async () => {
  const seat = { name: "iris-game-master-alone", role: gameMaster.slug, game: "alone" }
  const story = () => ({ title: "Alone", master: seat.name, oneSeat: true })
  const served: string[] = []
  const serve = (_root: string, game: string, calledAs: string) => {
    served.push(`${game}\t${calledAs}`)
    return "the checklist"
  }
  const said = await storyTurnNext([], GIVEN, () => seat, handOut, story, serve)
  expect(said.report).toEqual(["the checklist"])
  expect(served).toEqual(["alone\takasha story turn advance"])
  expect(HANDED).not.toContain("alone")
})

test("a one-seat story's other seat and a seat-graph game master are served no checklist", async () => {
  const serve = () => "the checklist"
  const writer = { name: "iris-writer-alone", role: "writer", game: "alone" }
  const alone = () => ({ title: "Alone", master: "iris-game-master-alone", oneSeat: true })
  const told = await storyTurnNext([], GIVEN, () => writer, handOut, alone, serve)
  expect(told.report).toEqual([nothingSaid(writer.name)])
  const master = { name: "iris-game-master-saga", role: gameMaster.slug, game: "saga" }
  const graph = () => ({ title: "Saga", master: master.name })
  const said = await storyTurnNext([], GIVEN, () => master, handOut, graph, serve)
  expect(said.report).not.toContain("the checklist")
})
