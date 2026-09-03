import { describe, expect, test } from "bun:test"
import {
  classifyTranscriptDelivery,
  combineDeliveryFindings,
  openingChannelMessageId,
  readDeliveryRecords,
  TURN_MARGIN,
} from "./channel-delivery.module.code.ts"

const A = "11111111-2222-3333-4444-555555555555"
const B = "66666666-7777-8888-9999-aaaaaaaaaaaa"

const wrapper = (id: string): string => `<channel from="x" message_id=\\"${id}\\">body</channel>`

const enqueue = (id: string): string =>
  JSON.stringify({ type: "queue-operation", operation: "enqueue", content: wrapper(id) })

const injection = (id: string): string =>
  JSON.stringify({
    type: "attachment",
    attachment: { type: "queued_command", prompt: wrapper(id) },
  })

const turnEnd = JSON.stringify({ type: "assistant", message: { stop_reason: "end_turn" } })

const selfRead = (id: string): string =>
  JSON.stringify({
    type: "user",
    message: { content: [{ type: "tool_result", content: `${id}\tthe row` }] },
  })

describe("openingChannelMessageId", () => {
  test("takes the id off an escaped wrapper", () => {
    expect(openingChannelMessageId(wrapper(A))).toBe(A)
  })

  test("takes the id off an unescaped wrapper", () => {
    expect(openingChannelMessageId(`<channel message_id="${A}">x`)).toBe(A)
  })

  test("answers null where no wrapper opens the field", () => {
    expect(openingChannelMessageId("just some prose")).toBe(null)
    expect(openingChannelMessageId("")).toBe(null)
  })
})

describe("readDeliveryRecords", () => {
  test("passes over a line it cannot read rather than refusing", () => {
    expect(readDeliveryRecords("not json\n\n{}\n42\nnull")).toEqual([])
  })

  test("reads an enqueue, an injection, a turn end and a self read", () => {
    const text = [enqueue(A), injection(A), turnEnd, selfRead(B)].join("\n")
    expect(readDeliveryRecords(text)).toEqual([
      { kind: "enqueue", messageId: A },
      { kind: "injection", messageId: A },
      { kind: "turn-end", messageId: null },
      { kind: "self-read", messageId: B },
    ])
  })

  test("passes over a queue operation that is no enqueue", () => {
    const line = JSON.stringify({
      type: "queue-operation",
      operation: "dequeue",
      content: wrapper(A),
    })
    expect(readDeliveryRecords(line)).toEqual([])
  })

  test("passes over an attachment that is no queued command", () => {
    const line = JSON.stringify({
      type: "attachment",
      attachment: { type: "image", prompt: wrapper(A) },
    })
    expect(readDeliveryRecords(line)).toEqual([])
  })

  test("reads a user message whose content is the wrapper itself as an injection", () => {
    const line = JSON.stringify({ type: "user", message: { content: wrapper(B) } })
    expect(readDeliveryRecords(line)).toEqual([{ kind: "injection", messageId: B }])
  })

  test("reads every distinct id out of a tool result's text blocks once", () => {
    const line = JSON.stringify({
      type: "user",
      message: {
        content: [
          { type: "tool_result", content: [{ text: `${A}\trow` }, { text: B }, { text: A }] },
        ],
      },
    })
    expect(readDeliveryRecords(line)).toEqual([
      { kind: "self-read", messageId: A },
      { kind: "self-read", messageId: B },
    ])
  })
})

describe("classifyTranscriptDelivery", () => {
  test("an injection settles the message as injected", () => {
    expect(
      classifyTranscriptDelivery({
        text: [enqueue(A), injection(A)].join("\n"),
        messageId: A,
        sessionEnded: null,
      })
    ).toEqual({
      outcome: "injected",
      ground: "injection",
      turnsSinceEnqueue: 0,
      overtakenBy: null,
      selfRead: false,
    })
  })

  test("no enqueue reads as absent", () => {
    expect(classifyTranscriptDelivery({ text: turnEnd, messageId: A, sessionEnded: true })).toEqual(
      {
        outcome: "absent",
        ground: "no-enqueue",
        turnsSinceEnqueue: 0,
        overtakenBy: null,
        selfRead: false,
      }
    )
  })

  test("a later message injected ahead of this one overtook it", () => {
    const text = [enqueue(A), enqueue(B), injection(B)].join("\n")
    const finding = classifyTranscriptDelivery({ text, messageId: A, sessionEnded: null })
    expect(finding.outcome).toBe("lost")
    expect(finding.ground).toBe("overtaken")
    expect(finding.overtakenBy).toBe(B)
  })

  test("more turns than the margin reads as lost", () => {
    const turns = Array.from({ length: TURN_MARGIN + 1 }, () => turnEnd)
    const finding = classifyTranscriptDelivery({
      text: [enqueue(A), ...turns].join("\n"),
      messageId: A,
      sessionEnded: null,
    })
    expect(finding.outcome).toBe("lost")
    expect(finding.ground).toBe("turns-elapsed")
    expect(finding.turnsSinceEnqueue).toBe(TURN_MARGIN + 1)
  })

  test("the margin itself is not yet lost", () => {
    const turns = Array.from({ length: TURN_MARGIN }, () => turnEnd)
    const finding = classifyTranscriptDelivery({
      text: [enqueue(A), ...turns].join("\n"),
      messageId: A,
      sessionEnded: null,
    })
    expect(finding.outcome).toBe("not-yet")
    expect(finding.ground).toBe("no-proof")
  })

  test("a session that ended without the injection reads as lost", () => {
    const finding = classifyTranscriptDelivery({
      text: enqueue(A),
      messageId: A,
      sessionEnded: true,
    })
    expect(finding.outcome).toBe("lost")
    expect(finding.ground).toBe("session-ended")
  })

  test("a seat that read the message out of its own inbox is marked", () => {
    const finding = classifyTranscriptDelivery({
      text: [enqueue(A), selfRead(A)].join("\n"),
      messageId: A,
      sessionEnded: null,
    })
    expect(finding.selfRead).toBe(true)
    expect(finding.outcome).toBe("not-yet")
  })
})

describe("combineDeliveryFindings", () => {
  const base = { ground: "no-proof", selfRead: false, recipient: false } as const

  test("one injected transcript settles the set", () => {
    expect(
      combineDeliveryFindings({
        findings: [
          { ...base, outcome: "lost", ground: "turns-elapsed" },
          { ...base, outcome: "injected", ground: "injection" },
        ],
      })
    ).toEqual({ verdict: "injected", reason: "injection" })
  })

  test("a recipient that found it in its own inbox reads as self found", () => {
    expect(
      combineDeliveryFindings({
        findings: [{ ...base, outcome: "not-yet", selfRead: true, recipient: true }],
      })
    ).toEqual({ verdict: "self-found", reason: "inbox-read" })
  })

  test("a self read by someone who was not the recipient does not count", () => {
    expect(
      combineDeliveryFindings({
        findings: [{ ...base, outcome: "not-yet", selfRead: true, recipient: false }],
      })
    ).toEqual({ verdict: "not-yet", reason: "no-proof" })
  })

  test("one seat still mid-turn holds the whole set at not yet", () => {
    expect(
      combineDeliveryFindings({
        findings: [
          { ...base, outcome: "lost", ground: "session-ended" },
          { ...base, outcome: "not-yet" },
        ],
      })
    ).toEqual({ verdict: "not-yet", reason: "no-proof" })
  })

  test("a lost finding carries its own ground as the reason", () => {
    expect(
      combineDeliveryFindings({
        findings: [{ ...base, outcome: "lost", ground: "overtaken" }],
      })
    ).toEqual({ verdict: "lost", reason: "overtaken" })
  })

  test("nothing observed anywhere is undetermined", () => {
    expect(
      combineDeliveryFindings({
        findings: [{ ...base, outcome: "absent", ground: "no-enqueue" }],
      })
    ).toEqual({ verdict: "undetermined", reason: "no-proof" })
  })

  test("no findings at all is undetermined", () => {
    expect(combineDeliveryFindings({ findings: [] })).toEqual({
      verdict: "undetermined",
      reason: "no-proof",
    })
  })
})
