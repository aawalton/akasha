import { expect, test } from "bun:test"
import {
  handedOut,
  masterOf,
  notedOf,
  startedAgain,
  TRIES,
} from "akasha/command/pages/story/turn/modules/turn-hand-retrying/turn-hand-retrying.module.code.ts"
import { REACHED } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"

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

const SEATED = { game: "saga", story: { title: "Saga", master: MASTER } }

const ALONE = { game: "saga", story: { title: "Saga", master: MASTER, oneSeat: true } }

const MASTERED = { master: MASTER, persona: "iris" }

test("a reviewer's notes reach the game master and writer seats, and a one-seat story's game master alone", () => {
  expect(notedOf(SEATED, MASTERED)).toEqual([MASTER, "iris-writer-saga"])
  expect(notedOf(ALONE, MASTERED)).toEqual([MASTER])
})

test("a hand-in hands out the beats it made ready, and a one-seat story's to no seat", () => {
  const before = beatsOf({ beat: 1, event: "One." })
  const after = beatsOf({ beat: 1, event: "One.", changes: [] })
  expect(handedOut(SEATED, [before], [after])).toEqual([{ part: "prose", turn: 0, beat: 1 }])
  expect(handedOut(ALONE, [before], [after])).toEqual([])
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
