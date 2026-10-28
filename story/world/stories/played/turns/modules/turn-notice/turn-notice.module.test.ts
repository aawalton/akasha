import { expect, test } from "bun:test"
import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  noticeOf,
  statusOf,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  noticeRead,
  noticeStale,
  STALE,
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

test("a notice of a turn still at a working step is current though a later turn is queued", () => {
  const statuses = new Map([
    [TEN, statusOf("world-builder")],
    [ELEVEN, statusOf("world-builder")],
  ])
  expect(noticeStale(noticeOf(TEN, "world-builder"), statuses)).toBe(false)
  const writing = new Map([
    [TEN, statusOf("writer")],
    [ELEVEN, statusOf("world-builder")],
  ])
  expect(noticeStale(noticeOf(TEN, "writer"), writing)).toBe(false)
})

test("a notice of a turn no page holds, or no notice at all, is not called stale", () => {
  expect(noticeStale(noticeOf(TEN, "writer"), new Map())).toBe(false)
  expect(noticeStale("a word from the player", new Map([[TEN, statusOf("player")]]))).toBe(false)
})

const PROGRAM = join(import.meta.dir, "turn-notice.module.code.ts")

function judgedByProgram(body: string, statuses: Map<string, string>): string {
  const done = ran(["bun", PROGRAM], {
    stdin: Buffer.from(JSON.stringify({ body, statuses: [...statuses] })),
  })
  expect(done.code).toBe(0)
  return done.out
}

test("run as a program, it judges the notice handed in and says stale or current", () => {
  expect(judgedByProgram(noticeOf(TEN, "writer"), new Map([[TEN, statusOf("reviewers")]]))).toBe(
    STALE
  )
  expect(judgedByProgram(noticeOf(TEN, "writer"), new Map([[TEN, statusOf("writer")]]))).toBe(
    "current"
  )
})

test("run as a program on input it cannot read, it fails rather than judging", () => {
  expect(ran(["bun", PROGRAM], { stdin: Buffer.from("{") }).code).toBe(1)
})

test("a notice of a written chapter names it a chapter and reads back the same way", () => {
  const chapter = "stories/written/saga/chapters/saga-0002.story-chapter-written.ts"
  const said = noticeOf(chapter, "reviewers", [], "chapter")
  expect(said).toStartWith(`The chapter \`${chapter}\` is at reviewers.\n`)
  expect(said).toContain(`read it with \`akasha read --file-path ${chapter}\``)
  expect(said).toContain("The story's pages are under `stories/written/saga/`.")
  expect(noticeRead(said)).toEqual({ turn: chapter, step: "reviewers" })
})
