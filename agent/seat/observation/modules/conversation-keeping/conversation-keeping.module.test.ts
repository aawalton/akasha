import { expect, test } from "bun:test"
import {
  type BytesOf,
  changedFrom,
  conversationAt,
  lastCompactionAt,
  readOn,
  type StartOf,
} from "akasha/agent/seat/observation/modules/conversation-keeping/conversation-keeping.module.code.ts"
import {
  ENTRIES_AFTER_COMPACTION,
  TRANSCRIPT,
  TRANSCRIPT_BEFORE,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.module.test-fixtures.ts"

const PATH = "/transcripts/seat.jsonl"

function readerOver(text: string): { read: BytesOf; asked: [number, number][] } {
  const bytes = Buffer.from(text, "utf8")
  const asked: [number, number][] = []
  return {
    asked,
    read: (_path, from, upTo) => {
      asked.push([from, upTo])
      return bytes.subarray(from, upTo)
    },
  }
}

const WHOLE = Buffer.byteLength(TRANSCRIPT)

const BEFORE = Buffer.byteLength(TRANSCRIPT_BEFORE)

const fromFirst: StartOf = () => 0

test("a first read takes the transcript from its last compaction", () => {
  const reader = readerOver(TRANSCRIPT)
  const kept = readOn(undefined, PATH, WHOLE, reader.read)
  expect(reader.asked.at(-1)).toEqual([BEFORE, WHOLE])
  expect(kept?.entries).toEqual(ENTRIES_AFTER_COMPACTION)
  expect(kept?.scannedTo).toBe(WHOLE)
})

test("the last compaction is found at the start of its line", () => {
  expect(lastCompactionAt(PATH, WHOLE, readerOver(TRANSCRIPT).read)).toBe(BEFORE)
  expect(lastCompactionAt(PATH, BEFORE, readerOver(TRANSCRIPT_BEFORE).read)).toBe(0)
})

test("a compaction written inside a record's text is no compaction", () => {
  const quoted = `${JSON.stringify({ type: "user", message: { content: '"subtype":"compact_boundary"' } })}\n`
  expect(lastCompactionAt(PATH, quoted.length, readerOver(quoted).read)).toBe(0)
})

test("a later read takes only the bytes written since, and ends where a whole read ends", () => {
  const reader = readerOver(TRANSCRIPT)
  const was = readOn(undefined, PATH, BEFORE, reader.read, fromFirst) ?? undefined
  const kept = readOn(was, PATH, WHOLE, reader.read)
  expect(reader.asked).toEqual([
    [0, BEFORE],
    [BEFORE, WHOLE],
  ])
  expect(kept?.entries).toEqual(ENTRIES_AFTER_COMPACTION)
})

test("a transcript no longer than when last read is not read again", () => {
  const reader = readerOver(TRANSCRIPT)
  const was = readOn(undefined, PATH, WHOLE, reader.read, fromFirst) ?? undefined
  expect(readOn(was, PATH, WHOLE, reader.read)).toBeNull()
  expect(reader.asked).toHaveLength(1)
})

test("a read stops at the last line end, leaving a line still being written for later", () => {
  const reader = readerOver(TRANSCRIPT)
  const kept = readOn(undefined, PATH, BEFORE + 5, reader.read, fromFirst)
  expect(kept?.scannedTo).toBe(BEFORE)
})

test("a transcript that shrank or moved is read again from its first byte", () => {
  const reader = readerOver(TRANSCRIPT)
  const was = readOn(undefined, PATH, WHOLE, reader.read, fromFirst) ?? undefined
  readOn(was, PATH, BEFORE, reader.read, fromFirst)
  readOn(was, "/transcripts/other.jsonl", WHOLE, reader.read, fromFirst)
  expect(reader.asked.slice(1)).toEqual([
    [0, BEFORE],
    [0, WHOLE],
  ])
})

test("a read that added no entry changes nothing to write", () => {
  const reader = readerOver(TRANSCRIPT)
  const was = readOn(undefined, PATH, WHOLE, reader.read)
  if (was === null) throw new Error("the first read answered nothing")
  expect(changedFrom(undefined, was)).toBe(true)
  expect(changedFrom(was, { ...was, scannedTo: WHOLE + 10 })).toBe(false)
  expect(changedFrom(was, { ...was, entries: [] })).toBe(true)
})

test("a seat's conversation sits beside the seat's page outside the commit", () => {
  expect(conversationAt("athena")).toEndWith("/athena/athena.seat.conversation.uncommitted.jsonl")
})
