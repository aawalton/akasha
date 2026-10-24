import { expect, test } from "bun:test"
import { regretCutIn } from "akasha/agent/seat/supervisor/supervisor-action/modules/regret-cut/regret-cut.module.code.ts"

const MINE = "message-0123456789ab"

const OTHER = "message-ba9876543210"

function wrapped(id: string): string {
  return `<channel source="messages" sender="alan" message_id="${id}">\nhello\n</channel>`
}

const ENDED = JSON.stringify({
  type: "assistant",
  message: { stop_reason: "end_turn", content: [{ type: "text", text: "done" }] },
})

const WORKING = JSON.stringify({
  type: "assistant",
  message: { stop_reason: null, content: [{ type: "text", text: "partly" }] },
})

const TYPED = JSON.stringify({ type: "user", message: { content: "a typed prompt" } })

function said(id: string): string {
  return JSON.stringify({ type: "user", message: { content: wrapped(id) } })
}

function queued(id: string): string {
  return JSON.stringify({ type: "queue-operation", operation: "enqueue", content: wrapped(id) })
}

function folded(id: string): string {
  return JSON.stringify({
    type: "attachment",
    attachment: { type: "queued_command", commandMode: "prompt", prompt: wrapped(id) },
  })
}

function bytesOf(lines: readonly string[]): Uint8Array {
  return new TextEncoder().encode(lines.map((one) => `${one}\n`).join(""))
}

function lengthOf(lines: readonly string[]): number {
  return bytesOf(lines).length
}

test("a message that opened the turn still running is cut just before the line saying it", () => {
  const before = [TYPED, ENDED]
  expect(regretCutIn(bytesOf([...before, said(MINE), WORKING]), MINE)).toEqual({
    cut: lengthOf(before),
  })
})

test("a message queued between turns is cut just before the line queuing it", () => {
  const before = [TYPED, ENDED]
  expect(regretCutIn(bytesOf([...before, queued(MINE), said(MINE), WORKING]), MINE)).toEqual({
    cut: lengthOf(before),
  })
})

test("the place a cut falls counts the bytes before what was handed in", () => {
  expect(regretCutIn(bytesOf([ENDED, said(MINE), WORKING]), MINE, 1_000)).toEqual({
    cut: 1_000 + lengthOf([ENDED]),
  })
})

test("a message folded into a turn already running is refused rather than cut", () => {
  const lines = [TYPED, WORKING, queued(MINE), folded(MINE), WORKING]
  expect(regretCutIn(bytesOf(lines), MINE)).toEqual({ refused: "mid-turn" })
})

test("a message whose reply ended is refused", () => {
  expect(regretCutIn(bytesOf([ENDED, said(MINE), WORKING, ENDED]), MINE)).toEqual({
    refused: "finished",
  })
})

test("a message another message came after is refused", () => {
  const lines = [ENDED, said(MINE), WORKING, folded(OTHER), WORKING]
  expect(regretCutIn(bytesOf(lines), MINE)).toEqual({ refused: "overtaken" })
})

test("a message a typed prompt came after is refused", () => {
  const lines = [ENDED, said(MINE), WORKING, TYPED]
  expect(regretCutIn(bytesOf(lines), MINE)).toEqual({ refused: "overtaken" })
})

test("a message the transcript holds nowhere is refused", () => {
  expect(regretCutIn(bytesOf([ENDED, said(OTHER), WORKING]), MINE)).toEqual({
    refused: "absent",
  })
})

test("a line left half written by a child signalled away is read over", () => {
  const before = [ENDED]
  const bytes = new TextEncoder().encode(`${ENDED}\n${said(MINE)}\n${WORKING}\n{"type":"assi`)
  expect(regretCutIn(bytes, MINE)).toEqual({ cut: lengthOf(before) })
})
