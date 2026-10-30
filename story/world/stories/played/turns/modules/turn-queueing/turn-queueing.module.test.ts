import { expect, test } from "bun:test"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import {
  holdsBack,
  QUEUED_KEYS,
} from "akasha/story/world/stories/played/turns/modules/turn-queueing/turn-queueing.module.code.ts"

const at = (status: string, more: Readonly<Record<string, unknown>> = {}) => ({
  stepStatus: `${stepStatus.slug}/${status}`,
  ...more,
})

const FLOWING = `${JSON.stringify({ beat: 1, event: "One.", changes: [] })}\n`

const REMEMBERED = `${JSON.stringify({ beat: 1, event: "One.", changes: [], memory: [] })}\n`

test("a turn at beats holds the next back until every beat has its memory", () => {
  expect(holdsBack(at("beats", { beats: FLOWING }))).toBe(true)
  expect(holdsBack(at("beats", { beats: REMEMBERED }))).toBe(false)
})

test("a turn at world-builder or game-master holds the next back", () => {
  expect(holdsBack(at("world-builder"))).toBe(true)
  expect(holdsBack(at("game-master"))).toBe(true)
})

test("a turn at player still owing its memory holds the next back until that memory lands", () => {
  expect(holdsBack(at("player", { memoryOwed: true }))).toBe(true)
  expect(holdsBack(at("player", { beats: FLOWING }))).toBe(false)
  expect(QUEUED_KEYS).toContain("memoryOwed")
})

test("a roleplayed turn, a turn at player, and no turn hold nothing back", () => {
  expect(holdsBack(at("world-builder", { roleplayed: true }))).toBe(false)
  expect(holdsBack(at("player"))).toBe(false)
  expect(holdsBack(undefined)).toBe(false)
})
