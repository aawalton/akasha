import { expect, test } from "bun:test"
import {
  masterOf,
  startedAgain,
  TRIES,
} from "akasha/command/pages/story/turn/modules/turn-hand-retrying/turn-hand-retrying.module.code.ts"
import { REACHED } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"

const MASTER = "iris-game-master-saga"

test("a game master seat unset for a moment is read again until it is there", async () => {
  const stories = [null, null, { title: "Saga", master: MASTER }]
  const waits: number[] = []
  const reach = { ...REACHED, storyOf: () => stories.shift() ?? null }
  const found = await masterOf(reach, "root", "saga", async (ms) => waits.push(ms))
  expect(found).toEqual({ master: MASTER, persona: "iris" })
  expect(waits).toHaveLength(2)
})

test("a game master seat never there is a fault after every try", async () => {
  let reads = 0
  const reach = {
    ...REACHED,
    storyOf: () => {
      reads += 1
      return null
    },
  }
  const found = await masterOf(reach, "root", "saga", async () => undefined)
  expect("refused" in found && found.refused).toContain("no beat was handed out")
  expect(reads).toBe(TRIES)
})

test("a seat that would not start for its beat is started again", async () => {
  let starts = 0
  const reach = {
    ...REACHED,
    start: async () => {
      starts += 1
      if (starts < 3) throw new Error("the seat is busy")
      return { how: "started" as const, name: "iris-writer-saga" }
    },
  }
  const starting = { persona: "iris", role: "writer", game: "saga", flex: null, prompt: "go" }
  const handed = await startedAgain(reach, starting, [], async () => undefined)
  expect([handed.name, starts]).toEqual(["iris-writer-saga", 3])
})
