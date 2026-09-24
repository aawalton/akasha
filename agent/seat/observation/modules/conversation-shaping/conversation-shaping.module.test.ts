import { expect, test } from "bun:test"
import {
  conversationBody,
  conversationFrom,
  shapedLine,
  toolLine,
  workedFor,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.module.code.ts"
import {
  ENTRIES_AFTER_COMPACTION,
  TRANSCRIPT,
  TRANSCRIPT_AFTER,
  TRANSCRIPT_BEFORE,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.module.test-fixtures.ts"

test("a transcript is shaped into the entries since its last compaction", () => {
  expect(conversationFrom(TRANSCRIPT)).toEqual(ENTRIES_AFTER_COMPACTION)
})

test("a transcript with no compaction keeps every entry", () => {
  expect(conversationFrom(TRANSCRIPT_BEFORE).map((one) => one.kind)).toEqual(["person", "agent"])
})

test("a read resumed from the entries already shaped ends where a whole read ends", () => {
  const before = conversationFrom(TRANSCRIPT_BEFORE)
  expect(conversationFrom(TRANSCRIPT_AFTER, before)).toEqual(conversationFrom(TRANSCRIPT))
})

test("a compaction ending clears the entries before it", () => {
  expect(shapedLine(JSON.stringify({ type: "system", subtype: "compact_boundary" }))).toEqual({
    compacted: true,
  })
})

test("a message of nothing but an image is an entry counting that image", () => {
  const line = JSON.stringify({
    type: "user",
    timestamp: "t",
    message: { role: "user", content: [{ type: "image", source: { type: "base64" } }] },
  })
  expect(shapedLine(line)).toEqual({
    entries: [{ kind: "person", text: "", images: 1, at: "t" }],
  })
})

test("a turn's length is said the way the terminal says it", () => {
  expect(workedFor(7_400)).toBe("Worked for 7s")
  expect(workedFor(61_921)).toBe("Worked for 1m 2s")
  expect(workedFor(3_725_000)).toBe("Worked for 1h 2m 5s")
})

test("a tool with no subject is named alone", () => {
  expect(toolLine("TaskStop", "")).toBe("TaskStop")
  expect(toolLine("Grep", "listedKeys")).toBe("Grep(listedKeys)")
})

test("the body holds one entry to a line", () => {
  const body = conversationBody(ENTRIES_AFTER_COMPACTION)
  const lines = body.trimEnd().split("\n")
  expect(lines.map((one) => JSON.parse(one))).toEqual([...ENTRIES_AFTER_COMPACTION])
})
