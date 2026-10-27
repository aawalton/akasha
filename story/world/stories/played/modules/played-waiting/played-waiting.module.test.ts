import { expect, test } from "bun:test"
import { waitsOn } from "akasha/story/world/stories/played/modules/played-waiting/played-waiting.module.code.ts"
import {
  BEATS,
  GAME_MASTER,
  PLAYER,
  statusOf,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

function turnOn(step: TurnStep, roleplayed = false) {
  return { stepStatus: statusOf(step), roleplayed }
}

const MADE = turnOn(WORLD_BUILDER)

test("a turn at world-builder behind a turn at beats, world-builder or game-master waits", () => {
  for (const step of [BEATS, WORLD_BUILDER, GAME_MASTER]) {
    expect(waitsOn(MADE, turnOn(step))).toBe(true)
  }
})

test("a turn behind a turn at player, a first turn, a roleplayed turn and one at work wait not", () => {
  expect(waitsOn(MADE, turnOn(PLAYER))).toBe(false)
  expect(waitsOn(MADE, undefined)).toBe(false)
  expect(waitsOn(turnOn(WORLD_BUILDER, true), turnOn(BEATS))).toBe(false)
  expect(waitsOn(turnOn(GAME_MASTER), turnOn(BEATS))).toBe(false)
})
