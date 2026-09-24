import { expect, test } from "bun:test"
import {
  ENTRIES_AFTER_COMPACTION,
  TRANSCRIPT,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.computed-property-module.test-fixtures.ts"
import { work } from "akasha/agent/seat/properties/conversation.computed-property.code.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

const PATH = "/transcripts/seat.jsonl"

const BYTES = new TextEncoder().encode(TRANSCRIPT)

const REACH: Reach = {
  target: () => null,
  naming: () => [],
  file: (path) =>
    path === PATH ? { size: BYTES.length, read: (from, upTo) => BYTES.slice(from, upTo) } : null,
}

test("a seat's conversation is read from the transcript its path names", () => {
  expect(work({ transcriptPath: PATH }, REACH)).toEqual(ENTRIES_AFTER_COMPACTION)
})

test("a seat naming no transcript has no conversation", () => {
  expect(work({}, REACH)).toBeNull()
})

test("a seat naming a transcript that is not there has no conversation", () => {
  expect(work({ transcriptPath: "/transcripts/gone.jsonl" }, REACH)).toBeNull()
})
