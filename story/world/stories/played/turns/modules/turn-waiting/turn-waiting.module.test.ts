import { expect, test } from "bun:test"
import { roleOf } from "akasha/story/world/stories/played/turns/modules/turn-waiting/turn-waiting.module.code.ts"

test("a turn waits on the role its status names", () => {
  expect(roleOf({ status: "world-builder" })).toBe("world-builder")
  expect(roleOf({ status: "game-master" })).toBe("game-master")
  expect(roleOf({ status: "writer" })).toBe("writer")
  expect(roleOf({ status: "mechanics" })).toBe("story-recorder")
  expect(roleOf({ status: "player" })).toBe(null)
})

test("a roleplayed turn waits on the roleplay-recorder where it would wait on the world builder, game master or writer", () => {
  for (const status of ["world-builder", "game-master", "writer"] as const) {
    expect(roleOf({ status, roleplayed: true })).toBe("roleplay-recorder")
  }
})

test("a roleplayed turn waits on the usual role at every other status", () => {
  expect(roleOf({ status: "mechanics", roleplayed: true })).toBe("story-recorder")
  expect(roleOf({ status: "recorders", roleplayed: true })).toBe("story-recorder")
  expect(roleOf({ status: "reviewers", roleplayed: true })).toBe("reviewer")
  expect(roleOf({ status: "player", roleplayed: true })).toBe(null)
})
