import { expect, test } from "bun:test"
import { roleplayRecorder } from "akasha/agent/role/pages/roleplay-recorder.role.ts"
import {
  GAME_MASTER,
  MECHANICS,
  PLAYER,
  RECORDERS,
  REVIEWERS,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { roleOf } from "akasha/story/world/stories/played/turns/modules/turn-waiting/turn-waiting.module.code.ts"

test("a turn waits on the role its status names", () => {
  expect(roleOf({ status: "world-builder" })).toBe("world-builder")
  expect(roleOf({ status: "game-master" })).toBe("game-master")
  expect(roleOf({ status: "writer" })).toBe("writer")
  expect(roleOf({ status: "mechanics" })).toBe("story-recorder")
  expect(roleOf({ status: "player" })).toBe(null)
})

test("a roleplayed turn waits on the roleplay seat at world-builder", () => {
  expect(roleOf({ status: "world-builder", roleplayed: true })).toBe("roleplay")
})

test("a roleplayed turn waits on the roleplay-recorder at every status after world-builder", () => {
  for (const status of [GAME_MASTER, MECHANICS, WRITER, REVIEWERS, RECORDERS]) {
    expect(roleOf({ status, roleplayed: true })).toBe(roleplayRecorder.slug)
  }
})

test("a roleplayed turn at player waits on nobody", () => {
  expect(roleOf({ status: PLAYER, roleplayed: true })).toBe(null)
})
