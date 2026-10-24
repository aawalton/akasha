import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const couplesCallAudio = {
  id: "01a16fae-6058-7ed4-879d-925bc538cc54",
  type: "page-type/module",
  slug: "couples-call-audio",
  definition: "the sound a couples call carries between the phones and the live model",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A phone leg carries 8 kHz mu-law sound in frames of 20 milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The live model hears both legs mixed into one 16 kHz stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each leg is sent the other spouse and the live model mixed together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg is speaking where a frame is louder than a fixed threshold.",
    },
  ],
  createdAt: "2026-10-24T20:51:01.335Z",
  updatedAt: "2026-10-24T20:51:01.335Z",
} as const satisfies Module
