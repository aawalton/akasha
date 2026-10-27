import { expect, test } from "bun:test"
import { gameMaster } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { roleplay } from "akasha/agent/role/pages/roleplay.role.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import {
  coordinatorOf,
  flexOf,
  noticedOf,
} from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

const GAME = "the-saga"

const MASTER = "mari-game-master-the-saga"

const NARRATOR = "shaestrel-roleplay-the-saga"

test("a game master seat named for its persona and game spells that persona", () => {
  expect(coordinatorOf(MASTER, GAME)).toEqual({ persona: "mari", role: gameMaster.slug })
  expect(coordinatorOf("the-saga-game-master", GAME)).toBeNull()
  expect(coordinatorOf("-game-master-the-saga", GAME)).toBeNull()
})

test("a roleplay seat named for its persona and story spells that persona", () => {
  expect(coordinatorOf(NARRATOR, GAME)).toEqual({ persona: "shaestrel", role: roleplay.slug })
  expect(coordinatorOf("-roleplay-the-saga", GAME)).toBeNull()
})

test("a seat named neither way spells no persona", () => {
  expect(coordinatorOf("mari", GAME)).toBeNull()
  expect(coordinatorOf("mari-writer-the-saga", GAME)).toBeNull()
})

test("a notice of a roleplayed story reaches its roleplay seat alone", () => {
  expect(noticedOf(NARRATOR, GAME)).toEqual([NARRATOR])
})

test("a notice reaches the game master, the world builder and the writer of its persona", () => {
  expect(noticedOf(MASTER, GAME)).toEqual([
    MASTER,
    "mari-world-builder-the-saga",
    "mari-writer-the-saga",
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
