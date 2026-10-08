import { describe, expect, test } from "bun:test"
import {
  ASK_SEAT,
  base64Of,
  bytesOf,
  floatsOf,
  pcm16Of,
  replyAfter,
  timesSent,
  voiceSetupFor,
} from "akasha/agent/seat/voice/modules/setup/seat-voice-setup.module.code.ts"

const ASKED = [
  { kind: "person", text: "what's next?" },
  { kind: "agent", text: "Chapter five." },
  { kind: "turn-end" },
  { kind: "person", text: "what's next?" },
  { kind: "tool", text: "read" },
  { kind: "agent", text: "Chapter six." },
  { kind: "agent", text: "It is short." },
]

describe("replyAfter", () => {
  test("the reply is what the seat said after the message, once its turn ends", () => {
    expect(replyAfter(ASKED, "what's next?", 0)).toBe("Chapter five.")
  })

  test("a message sent again waits for the reply to the new sending", () => {
    expect(replyAfter(ASKED, "what's next?", 1)).toBeNull()
    expect(replyAfter([...ASKED, { kind: "turn-end" }], "what's next?", 1)).toBe(
      "Chapter six.\n\nIt is short."
    )
  })

  test("a message the seat has not taken yet has no reply", () => {
    expect(replyAfter(ASKED, "what's next?", 2)).toBeNull()
  })

  test("the times a message was sent before are counted by its words", () => {
    expect(timesSent(ASKED, " what's next? ")).toBe(2)
  })
})

describe("voiceSetupFor", () => {
  test("the setup names the persona and offers the one tool that asks the seat", () => {
    const setup = voiceSetupFor("Nimue")
    expect(setup.systemInstruction.parts[0]?.text).toContain("You are Nimue's voice.")
    expect(setup.tools[0]?.functionDeclarations[0]?.name).toBe(ASK_SEAT)
  })
})

describe("audio", () => {
  test("48 kHz floats come out as 16 kHz samples, a third as many", () => {
    const made = pcm16Of(new Float32Array(48).fill(0.5), 48_000)
    expect(made.length).toBe(16)
    expect(made[0]).toBe(16_384)
  })

  test("16-bit samples read back as floats", () => {
    const bytes = new Uint8Array(new Int16Array([0x7fff, -0x7fff, 0]).buffer)
    expect([...floatsOf(bytes)]).toEqual([1, -1, 0])
  })

  test("bytes survive base64", () => {
    expect([...bytesOf(base64Of(new Uint8Array([0, 1, 254, 255])))]).toEqual([0, 1, 254, 255])
  })
})
