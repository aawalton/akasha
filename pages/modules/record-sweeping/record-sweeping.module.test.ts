import { expect, test } from "bun:test"
import {
  keptFrom,
  packed,
  propertyOf,
} from "akasha/pages/modules/record-sweeping/record-sweeping.module.code.ts"

const WINDOWS: ReadonlyMap<string, number> = new Map([
  ["entries", 24],
  ["logs", 24],
])

function rowAt(at: string): string {
  return JSON.stringify({ runId: "one", ranAt: at })
}

test("a file held under a property stating a window is answered that property", () => {
  expect(propertyOf("a/b.agent-hook.entries.uncommitted.jsonl", WINDOWS)).toBe("entries")
  expect(propertyOf("a/b.code-check.check.logs.uncommitted.jsonl", WINDOWS)).toBe("logs")
})

test("a numbered part is answered the property that part carries", () => {
  expect(propertyOf("a/b.agent-hook.entries.part7.uncommitted.jsonl", WINDOWS)).toBe("entries")
})

test("a file held under a property stating no window is answered nothing", () => {
  expect(propertyOf("a/b.seat-log-day.lines.uncommitted.jsonl", WINDOWS)).toBeNull()
  expect(propertyOf("a/b.agent-hook.ts", WINDOWS)).toBeNull()
})

test("a line that ran before the cutoff is dropped and one that ran after is kept", () => {
  const text = `${rowAt("2026-09-01T00:00:00.000Z")}\n${rowAt("2026-09-13T00:00:00.000Z")}\n`
  const held = keptFrom(text, Date.parse("2026-09-12T00:00:00.000Z"))
  expect(held.dropped).toBe(1)
  expect(held.kept).toBe(`${rowAt("2026-09-13T00:00:00.000Z")}\n`)
})

test("a line stating no instant this can read is kept", () => {
  const text = `${JSON.stringify({ runId: "one" })}\n${rowAt("2026-09-01T00:00:00.000Z")}\n`
  const held = keptFrom(text, Date.parse("2026-09-12T00:00:00.000Z"))
  expect(held.dropped).toBe(1)
  expect(held.kept).toBe(`${JSON.stringify({ runId: "one" })}\n`)
})

test("a line that will not read as json is kept", () => {
  const held = keptFrom("{not json\n", Date.parse("2026-09-12T00:00:00.000Z"))
  expect(held.dropped).toBe(0)
  expect(held.kept).toBe("{not json\n")
})

test("lines leaving nothing behind pack into no file at all", () => {
  expect(packed("", 100)).toEqual([])
})

test("lines past the ceiling pack into a part of their own", () => {
  const filling = packed("aaaa\nbbbb\ncccc\n", 10)
  expect(filling).toEqual(["aaaa\nbbbb\n", "cccc\n"])
})

test("lines within the ceiling pack into one part", () => {
  expect(packed("aaaa\nbbbb\n", 10)).toEqual(["aaaa\nbbbb\n"])
})
