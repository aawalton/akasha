import { expect, test } from "bun:test"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import {
  flexOf,
  noticedOf,
  personaOf,
} from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

const GAME = "the-saga"

const MASTER = "mari-game-master-the-saga"

test("a game master seat named for its persona and game spells that persona", () => {
  expect(personaOf(MASTER, GAME)).toBe("mari")
  expect(personaOf("the-saga-game-master", GAME)).toBeNull()
  expect(personaOf("-game-master-the-saga", GAME)).toBeNull()
})

test("a notice reaches the game master, the world builder and the writer of its persona", () => {
  expect(noticedOf(MASTER, GAME)).toEqual([
    MASTER,
    "mari-world-builder-the-saga",
    "mari-writer-the-saga",
  ])
})

test("a notice of a story with editor steps reaches its beat editor and prose editor too", () => {
  expect(noticedOf(MASTER, GAME, true)).toEqual([
    MASTER,
    "mari-world-builder-the-saga",
    "mari-writer-the-saga",
    "mari-beat-editor-the-saga",
    "mari-prose-editor-the-saga",
  ])
})

test("a game master spelling no persona is the only seat a notice reaches", () => {
  expect(noticedOf("a-seat", GAME)).toEqual(["a-seat"])
})

test("a seat's flex is its place among its kind, sorted", () => {
  expect(flexOf(["voice", continuity.slug], "voice")).toBe("flex-2")
  expect(flexOf([memory.slug, "cast"], memory.slug)).toBe("flex-2")
  expect(flexOf(["cast"], "taste")).toBe("flex-2")
})
