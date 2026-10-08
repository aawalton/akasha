import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatVoiceSetup = {
  id: "01a11b35-8c5b-7d28-8f11-126582f0cc0b",
  type: "page-type/module",
  slug: "seat-voice-setup",
  definition: "how a voice session with a seat is set up, and the sounds and replies it carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A voice session runs on Gemini 3.8 Live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The voice has one tool, which sends Alan's words to the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tool runs while the voice keeps talking, and its reply is spoken once heard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the voice is told comes from the seat-voice brief rather than from code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reply is what the seat said after the message, taken once the seat's turn ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The phone sends 16 kHz sound and is sent 24 kHz sound back.",
    },
  ],
} as const satisfies Module
