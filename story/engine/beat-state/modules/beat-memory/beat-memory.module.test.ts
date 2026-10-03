import { expect, test } from "bun:test"
import {
  type Memory,
  memoryIn,
  shownOf,
} from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"

const MERE = "lore/the-mere"

const FACT = "The mere has no bottom."

const ELSIE = "character-player/elsie"

const LEARNS: Memory = { beat: 3, page: MERE, fact: FACT, learns: ELSIE }

const SHOWN: Memory = { beat: 1, page: MERE, fact: FACT, shown: true }

const NEW: Memory = { beat: 2, page: MERE, fact: "The mere froze once.", establishes: true }

test("memory is json lines of learns, shown or establishes, kept in beat order", () => {
  const lines = [LEARNS, SHOWN, NEW].map((one) => JSON.stringify(one))
  expect(memoryIn(lines, 3)).toEqual([SHOWN, NEW, LEARNS])
})

test("a memory naming two acts, none, a stray key or a beat past the turn is refused", () => {
  expect(memoryIn([JSON.stringify({ ...LEARNS, shown: true })], 3)).toEqual({
    refused: "memory 1 states one of `learns`, `shown: true` or `establishes: true`, and only one",
  })
  expect(memoryIn([JSON.stringify({ ...SHOWN, mood: 1 })], 3)).toEqual({
    refused:
      "memory 1 states `mood`, and a memory states beat, page, fact, learns, shown, establishes",
  })
  expect(memoryIn([JSON.stringify(LEARNS)], 2)).toEqual({
    refused: "memory 1 names no beat from 1 to 2",
  })
  expect(memoryIn([JSON.stringify({ ...LEARNS, learns: "elsie" })], 3)).toEqual({
    refused: "memory 1 names who `learns` by no character's address",
  })
})

test("what the reader was shown is every shown or established fact", () => {
  expect(shownOf([SHOWN, NEW, LEARNS])).toEqual([SHOWN, NEW])
})
