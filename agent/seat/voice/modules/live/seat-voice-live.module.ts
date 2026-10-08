import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatVoiceLive = {
  id: "01a11b35-8c5b-72d4-8ea3-ddb274871642",
  type: "page-type/module",
  slug: "seat-voice-live",
  definition: "a voice session between Alan's microphone, Gemini Live and a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The phone talks to Gemini directly, with a token the web server gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words the voice sends the seat go as an ordinary message, and show as one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The voice stops speaking the moment Alan talks over it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A connection Gemini closes is opened again where it left off, up to three times.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Leaving the seat's page ends the voice session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session that fails says why beside the box rather than going quiet.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The site's script policy loads no worklet, so the microphone is heard on the page.",
    },
  ],
} as const satisfies Module
