import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatVoice = {
  id: "01a11b35-8c5b-79b0-9351-6ffc788b86f5",
  type: "page-type/domain",
  slug: "seat-voice",
  definition: "speech between Alan and a seat",
  parts: ["module/seat-voice-setup", "module/seat-voice-live", "page-type/voice-brief"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Gemini Live is the seat's ears and mouth, and the seat does the thinking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Voice and typing share one conversation with the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A microphone beside the seat's message box starts and ends talking.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The voice is one of Gemini's own rather than the persona's.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Gemini Live speaks only in its prebuilt voices and ignores a designed one.",
    },
  ],
  createdAt: "2026-10-08T11:10:56.603Z",
  updatedAt: "2026-10-30T14:34:45.172Z",
} as const satisfies Domain
