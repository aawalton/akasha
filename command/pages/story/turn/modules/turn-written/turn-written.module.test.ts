import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  writtenIn,
  writtenIndexed,
} from "akasha/command/pages/story/turn/modules/turn-written/turn-written.module.code.ts"

const BIG = "mechanics/health/big.saga-health.ts"

const SMALL = "mechanics/health/small.saga-health.ts"

test("a page is written on a turn only where its history has a line for that turn", () => {
  const histories = [
    [SMALL, '{"turn":1,"value":12}\n{"turn":30,"value":0}\n'],
    [BIG, '{"turn":1,"value":30}\nnot a line\n\n{"turn":41,"value":24}\n'],
  ] as const
  expect(writtenIn(histories, 41)).toEqual([BIG])
  expect(writtenIn(histories, 1)).toEqual([BIG, SMALL])
  expect(writtenIn(histories, 2)).toEqual([])
})

const ROOT = mkdtempSync(join("/var/tmp", "turn-written-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const STORY = "stories/the-saga"

const TURN_AT = `${STORY}/turns/the-saga-00-041.story-turn-played.ts`

mkdirSync(join(ROOT, STORY, "mechanics/health"), { recursive: true })
writeFileSync(join(ROOT, STORY, "mechanics/health/big.saga-health.history.jsonl"), '{"turn":41}\n')
writeFileSync(join(ROOT, STORY, "mechanics/health/small.saga-health.history.jsonl"), '{"turn":3}\n')

test("the pages written on a turn are its story's mechanic pages whose history has a line for it", () => {
  expect(writtenIndexed(ROOT, { at: TURN_AT, value: { position: 41 } })).toEqual([
    `${STORY}/${BIG}`,
  ])
})

test("a turn stating no position has no page written on it", () => {
  expect(writtenIndexed(ROOT, { at: TURN_AT, value: {} })).toEqual([])
})
