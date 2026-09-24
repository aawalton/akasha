import { expect, test } from "bun:test"
import { withImages } from "akasha/agent/message/modules/attached-images/agent-message-attached-images.computed-property-module.code.ts"
import {
  conversationFrom,
  conversationOf,
  lastCompactionAt,
  shapedLine,
  toolLine,
  workedFor,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.computed-property-module.code.ts"
import {
  ENTRIES_AFTER_COMPACTION,
  TRANSCRIPT,
  TRANSCRIPT_BEFORE,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.computed-property-module.test-fixtures.ts"
import type { Filed } from "akasha/page/computed-property/computed-property.page-type.ts"

function filedOver(text: string): Filed & { readonly asked: [number, number][] } {
  const bytes = new TextEncoder().encode(text)
  const asked: [number, number][] = []
  return {
    size: bytes.length,
    asked,
    read: (from, upTo) => {
      asked.push([from, upTo])
      return bytes.slice(from, upTo)
    },
  }
}

const BEFORE = new TextEncoder().encode(TRANSCRIPT_BEFORE).length

test("a transcript is shaped into the entries since its last compaction", () => {
  expect(conversationFrom(TRANSCRIPT)).toEqual(ENTRIES_AFTER_COMPACTION)
})

test("a transcript with no compaction keeps every entry", () => {
  expect(conversationFrom(TRANSCRIPT_BEFORE).map((one) => one.kind)).toEqual(["person", "agent"])
})

test("a file is read from the start of its last compaction's line", () => {
  const filed = filedOver(TRANSCRIPT)
  expect(conversationOf(filed)).toEqual(ENTRIES_AFTER_COMPACTION)
  expect(filed.asked.at(-1)).toEqual([BEFORE, filed.size])
})

test("a file with no compaction is read from its first byte", () => {
  expect(lastCompactionAt(filedOver(TRANSCRIPT_BEFORE))).toBe(0)
})

test("a compaction quoted inside a record's text is no compaction", () => {
  const quoted = `${JSON.stringify({ type: "user", message: { content: '"subtype":"compact_boundary"' } })}\n`
  expect(lastCompactionAt(filedOver(quoted))).toBe(0)
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

function channeled(sender: string): string {
  return `<channel source="messages" sender="${sender}" source_type="user" message_id="m">\n\nhello\nthere\n\n</channel>`
}

test("a message Alan sent a seat is the person's, with no wrapper", () => {
  const line = JSON.stringify({
    type: "user",
    isMeta: true,
    timestamp: "t",
    message: { role: "user", content: channeled("alan") },
  })
  expect(shapedLine(line)).toEqual({
    entries: [{ kind: "person", text: "hello\nthere", images: 0, at: "t" }],
  })
})

test("the images Alan attached to a message are counted rather than shown as words", () => {
  const image = "image-0123456789abcdef"
  const bytesAt = `pictures/0123456789abcdef/${image}.image.bytes.uncommitted.jpg`
  const said = `<channel source="messages" sender="alan" message_id="m">\n${withImages("look", [{ image, bytesAt }])}\n</channel>`
  const line = JSON.stringify({ type: "user", timestamp: "t", message: { content: said } })
  expect(shapedLine(line)).toEqual({
    entries: [{ kind: "person", text: "look", images: 1, at: "t" }],
  })
})

test("a message queued from anyone else names its sender", () => {
  const line = JSON.stringify({
    type: "attachment",
    timestamp: "t",
    attachment: { type: "queued_command", commandMode: "prompt", prompt: channeled("thea") },
  })
  expect(shapedLine(line)).toEqual({
    entries: [{ kind: "message", sender: "thea", text: "hello\nthere", at: "t" }],
  })
})
