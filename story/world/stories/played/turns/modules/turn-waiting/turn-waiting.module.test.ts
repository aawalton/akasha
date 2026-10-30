import { expect, test } from "bun:test"
import { gameMaster } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { reviewer } from "akasha/agent/role/pages/reviewer.role.ts"
import { roleplay } from "akasha/agent/role/pages/roleplay.role.ts"
import { roleplayRecorder } from "akasha/agent/role/pages/roleplay-recorder.role.ts"
import { storyRecorder } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"
import {
  BEATS,
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

test("a one-seat turn waits on the game master at every status but player", () => {
  for (const status of [WORLD_BUILDER, GAME_MASTER, MECHANICS, WRITER, REVIEWERS, RECORDERS]) {
    expect(roleOf({ status, oneSeat: true })).toBe(gameMaster.slug)
  }
  expect(roleOf({ status: PLAYER, oneSeat: true })).toBe(null)
})

test("a one-seat turn is advanced by its game master seat, and by no other seat", () => {
  const alone = { ...HELD, oneSeat: true }
  const master = { role: gameMaster.slug, game: "the-saga" }
  for (const status of [WORLD_BUILDER, MECHANICS, WRITER, REVIEWERS, RECORDERS]) {
    expect(callerRefused({ ...alone, status }, master)).toBe(null)
  }
  const builder = { role: worldBuilder.slug, game: "the-saga" }
  expect(callerRefused({ ...alone, status: WORLD_BUILDER }, builder)).toContain(
    `waits on the ${gameMaster.slug} of \`the-saga\``
  )
  const writing = { role: writer.slug, game: "the-saga" }
  expect(callerRefused({ ...alone, status: WRITER }, writing)).toContain(`a ${writer.slug} seat`)
  const elsewhere = { role: gameMaster.slug, game: "another" }
  expect(callerRefused({ ...alone, status: WRITER }, elsewhere)).toContain(
    "a game-master seat of `another`"
  )
})

test("a one-seat turn at player owing its memory waits on its game master seat for it", () => {
  const owing = { ...HELD, status: PLAYER, oneSeat: true, memoryOwed: true }
  expect(roleOf(owing)).toBe(gameMaster.slug)
  expect(callerRefused(owing, { role: gameMaster.slug, game: "the-saga" })).toBe(null)
  expect(callerRefused(owing, { role: storyRecorder.slug, game: "the-saga" })).toContain(
    `the turn is at ${PLAYER}, so it waits on the ${gameMaster.slug} of \`the-saga\``
  )
  const remembered = { ...owing, memoryOwed: false }
  expect(callerRefused(remembered, { role: gameMaster.slug, game: "the-saga" })).toContain(
    "only the player's next action"
  )
})

test("a one-seat turn at beats waits on its game master seat alone", () => {
  const beating = { ...HELD, status: BEATS, oneSeat: true }
  expect(callerRefused(beating, { role: gameMaster.slug, game: "the-saga" })).toBe(null)
  for (const role of [writer.slug, storyRecorder.slug, reviewer.slug]) {
    expect(callerRefused(beating, { role, game: "the-saga" })).toBe(
      `the turn is at ${BEATS}, so it waits on the ${gameMaster.slug} seat of \`the-saga\`, beat by beat`
    )
  }
  const elsewhere = { role: gameMaster.slug, game: "another" }
  expect(callerRefused(beating, elsewhere)).toContain("beat by beat")
})

test("a seat-graph turn at beats still waits on every step's seat", () => {
  const beating = { ...HELD, status: BEATS }
  for (const role of [gameMaster.slug, writer.slug, storyRecorder.slug, reviewer.slug]) {
    expect(callerRefused(beating, { role, game: "the-saga" })).toBe(null)
  }
  const master = { role: gameMaster.slug, game: "the-saga" }
  expect(callerRefused({ ...HELD, status: WRITER }, master)).toContain(
    `waits on the ${writer.slug} of \`the-saga\``
  )
})
