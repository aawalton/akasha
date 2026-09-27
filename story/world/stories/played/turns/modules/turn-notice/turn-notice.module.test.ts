import { expect, test } from "bun:test"
import {
  noticeOf,
  statusOf,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  noticeRead,
  noticeStale,
  turnPathAfter,
} from "akasha/story/world/stories/played/turns/modules/turn-notice/turn-notice.module.code.ts"

const TURNS = "story/world/pages/personas/stories/played/the-dating-game/turns"

const TEN = `${TURNS}/the-dating-game-00-010.story-turn-played.ts`

const ELEVEN = `${TURNS}/the-dating-game-00-011.story-turn-played.ts`

test("a notice reads back as the turn and the status it was written with", () => {
  expect(noticeRead(noticeOf(TEN, "writer", ["lore/a-hall"]))).toEqual({
    turn: TEN,
    step: "writer",
  })
  expect(noticeRead("Turn 9 is ready for you, love!")).toBeNull()
  expect(noticeRead("The turn `x` is at nowhere.")).toBeNull()
})

test("the turn after a turn's path is the same path one number on", () => {
  expect(turnPathAfter(TEN)).toBe(ELEVEN)
  expect(turnPathAfter(`${TURNS}/no-number.story-turn-played.ts`)).toBeNull()
})

test("a notice is current while its turn holds its status and no later turn exists", () => {
  const statuses = new Map([[TEN, statusOf("writer")]])
  expect(noticeStale(noticeOf(TEN, "writer"), statuses)).toBe(false)
})

test("a notice is stale once its turn has moved past the status it names", () => {
  const statuses = new Map([[TEN, statusOf("reviewers")]])
  expect(noticeStale(noticeOf(TEN, "writer"), statuses)).toBe(true)
})

test("a notice at player is stale once the next turn is made", () => {
  const statuses = new Map([
    [TEN, statusOf("player")],
    [ELEVEN, statusOf("world-builder")],
  ])
  expect(noticeStale(noticeOf(TEN, "player"), statuses)).toBe(true)
})

test("a notice of a turn no page holds, or no notice at all, is not called stale", () => {
  expect(noticeStale(noticeOf(TEN, "writer"), new Map())).toBe(false)
  expect(noticeStale("a word from the player", new Map([[TEN, statusOf("player")]]))).toBe(false)
})
