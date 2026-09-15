import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const speltScanning = {
  id: "01a073e3-354d-7124-8a2c-e116b5340d81",
  type: "page-type/module",
  slug: "spelt-scanning",
  definition: "a backticked name filled with letters of its own length before a sentence is read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name inside backticks is read as one word rather than as English.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The filler runs the length the name ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every offset after the name holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The backticks themselves are kept.",
    },
  ],
} as const satisfies Module
