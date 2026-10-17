import { expect, test } from "bun:test"
import { roleplay } from "akasha/agent/role/pages/roleplay.role.ts"
import { roleplayRecorder } from "akasha/agent/role/pages/roleplay-recorder.role.ts"
import {
  GAME_MASTER,
  MECHANICS,
  PLAYER,
  RECORDERS,
  REVIEWERS,
  WORLD_BUILDER,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  callerRefused,
  roleOf,
} from "akasha/story/world/stories/played/turns/modules/turn-waiting/turn-waiting.module.code.ts"

const HELD = {
  game: "the-saga",
  status: GAME_MASTER,
  lore: [],
  issues: [],
  reviewedBy: [],
  recordedBy: [],
  written: false,
}

test("only a seat of the role the turn waits on, of the turn's story, advances it", () => {
  expect(callerRefused(HELD, { role: "game-master", game: "the-saga" })).toBe(null)
  expect(callerRefused(HELD, { role: "game-master", game: "another" })).toContain(
    "a game-master seat of `another`"
  )
  expect(callerRefused(HELD, { role: null, game: null })).toContain("no seat that holds a role")
  expect(callerRefused({ ...HELD, status: PLAYER }, { role: null, game: null })).toContain(
    "only the player's next action"
  )
})

test("a turn waits on the role its status names", () => {
  expect(roleOf({ status: "world-builder" })).toBe("world-builder")
  expect(roleOf({ status: "game-master" })).toBe("game-master")
  expect(roleOf({ status: "writer" })).toBe("writer")
  expect(roleOf({ status: "mechanics" })).toBe("story-recorder")
  expect(roleOf({ status: "player" })).toBe(null)
})

test("a roleplayed turn waits on the roleplay seat at world-builder and at game-master", () => {
  for (const status of [WORLD_BUILDER, GAME_MASTER]) {
    expect(roleOf({ status, roleplayed: true })).toBe(roleplay.slug)
  }
})

test("a roleplayed turn waits on the roleplay-recorder at every status after game-master", () => {
  for (const status of [MECHANICS, WRITER, REVIEWERS, RECORDERS]) {
    expect(roleOf({ status, roleplayed: true })).toBe(roleplayRecorder.slug)
  }
})

test("a roleplayed turn at player waits on nobody", () => {
  expect(roleOf({ status: PLAYER, roleplayed: true })).toBe(null)
})
