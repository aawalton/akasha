import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  firstTimestampOf,
  rotationFrom,
  SETTLED_MS,
  type TranscriptCandidate,
} from "./seat-transcript-rotation.module.code.ts"

const NAMED = "/transcripts/old.jsonl"

const WROTE_AT = 1_700_000_000_000

const NOW = WROTE_AT + SETTLED_MS + 1

function candidate(one: Partial<TranscriptCandidate> = {}): TranscriptCandidate {
  return {
    path: "/transcripts/new.jsonl",
    mtimeMs: WROTE_AT + 5_000,
    firstTimestampMs: WROTE_AT + 50,
    ...one,
  }
}

function reading(one: {
  readonly statedPath?: string | null
  readonly statedMtimeMs?: number | null
  readonly nowMs?: number
  readonly candidates?: readonly TranscriptCandidate[]
  readonly takenPaths?: readonly string[]
}) {
  return {
    statedPath: NAMED,
    statedMtimeMs: WROTE_AT,
    nowMs: NOW,
    candidates: [candidate()],
    takenPaths: [NAMED],
    ...one,
  }
}

test("a seat naming no transcript has none rotated", () => {
  expect(rotationFrom(reading({ statedPath: null }))).toBe(null)
})

test("a transcript the seat names that is not on the disk has none rotated", () => {
  expect(rotationFrom(reading({ statedMtimeMs: null }))).toBe(null)
})

test("a transcript written within the last minute is still live and rotates to none", () => {
  expect(rotationFrom(reading({ nowMs: WROTE_AT + SETTLED_MS - 1 }))).toBe(null)
})

test("a minute of silence is enough for the file to be finished", () => {
  expect(rotationFrom(reading({ nowMs: WROTE_AT + SETTLED_MS }))).toBe("/transcripts/new.jsonl")
})

test("one candidate beside a finished transcript is the answer", () => {
  expect(rotationFrom(reading({}))).toBe("/transcripts/new.jsonl")
})

test("two candidates leave the answer ambiguous, so nothing moves", () => {
  const two = [candidate(), candidate({ path: "/transcripts/other.jsonl" })]
  expect(rotationFrom(reading({ candidates: two }))).toBe(null)
})

test("a candidate another seat names is that seat's own and is left out", () => {
  const two = [candidate(), candidate({ path: "/transcripts/other.jsonl" })]
  expect(
    rotationFrom(reading({ candidates: two, takenPaths: [NAMED, "/transcripts/other.jsonl"] }))
  ).toBe("/transcripts/new.jsonl")
})

test("every candidate being named by a seat leaves no answer", () => {
  expect(rotationFrom(reading({ takenPaths: [NAMED, "/transcripts/new.jsonl"] }))).toBe(null)
})

test("a candidate whose first record predates the named file's last write is left out", () => {
  expect(
    rotationFrom(reading({ candidates: [candidate({ firstTimestampMs: WROTE_AT - 1 })] }))
  ).toBe(null)
})

test("a candidate carrying no readable first timestamp is left out", () => {
  expect(rotationFrom(reading({ candidates: [candidate({ firstTimestampMs: null })] }))).toBe(null)
})

test("a candidate no newer than the named file is left out", () => {
  expect(rotationFrom(reading({ candidates: [candidate({ mtimeMs: WROTE_AT })] }))).toBe(null)
})

test("no candidate at all leaves no answer", () => {
  expect(rotationFrom(reading({ candidates: [] }))).toBe(null)
})

// THE SHAPE CLAUDE CODE ACTUALLY WRITES. The opening records carry no timestamp of their own and
// there are five of them here, so a reader taking the first line answers nothing. The fifth
// carries a timestamp nested under its snapshot that is later than the first turn's own, so a
// reader that reached inside a record would answer the wrong moment rather than none.
const OPENING = [
  '{"type":"mode","mode":"normal","sessionId":"de64f69c"}',
  '{"type":"permission-mode","permissionMode":"bypassPermissions","sessionId":"de64f69c"}',
  '{"type":"atis-latch","atis":"","sessionId":"de64f69c"}',
  '{"type":"bridge-session","sessionId":"de64f69c","lastSequenceNum":0}',
  '{"type":"file-history-snapshot","snapshot":{"timestamp":"2026-09-04T12:55:30.605Z"}}',
  '{"type":"user","uuid":"e8cf4bde","timestamp":"2026-09-04T12:55:30.604Z"}',
].join("\n")

// The file the alan seat rotated onto opens with three such records rather than five.
const ROTATED = [
  '{"type":"mode","mode":"normal","sessionId":"67123964"}',
  '{"type":"bridge-session","sessionId":"67123964","lastSequenceNum":0}',
  '{"type":"file-history-snapshot","snapshot":{"timestamp":"2026-09-05T13:58:17.200Z"}}',
  '{"type":"user","uuid":"aaaa","timestamp":"2026-09-05T13:58:17.195Z"}',
  '{"type":"user","uuid":"bbbb","timestamp":"2026-09-05T13:58:17.110Z"}',
].join("\n")

function inAFolder(run: (folder: string) => void): void {
  const folder = mkdtempSync(join(tmpdir(), "seat-transcript-rotation-"))
  try {
    run(folder)
  } finally {
    rmSync(folder, { recursive: true, force: true })
  }
}

test("the first timestamp is the first record carrying one at its top level", () => {
  inAFolder((folder) => {
    const path = join(folder, "opening.jsonl")
    writeFileSync(path, `${OPENING}\n`)
    expect(firstTimestampOf(path)).toBe(Date.parse("2026-09-04T12:55:30.604Z"))
  })
})

test("a transcript opening with fewer unstamped records is read the same way", () => {
  inAFolder((folder) => {
    const path = join(folder, "rotated.jsonl")
    writeFileSync(path, `${ROTATED}\n`)
    expect(firstTimestampOf(path)).toBe(Date.parse("2026-09-05T13:58:17.195Z"))
  })
})

test("a transcript whose opening records are all unstamped carries no first timestamp", () => {
  inAFolder((folder) => {
    const path = join(folder, "bare.jsonl")
    writeFileSync(path, `${OPENING.split("\n").slice(0, 5).join("\n")}\n`)
    expect(firstTimestampOf(path)).toBe(null)
  })
})
