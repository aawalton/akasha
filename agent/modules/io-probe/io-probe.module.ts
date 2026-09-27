import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ioProbe = {
  id: "01a0695a-d2ea-7a83-ac29-18a8a68f3c6d",
  type: "page-type/module",
  slug: "io-probe",
  definition: "what an agent's transcripts hold and when they last changed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every transcript of the agent's own since a time is read whole, oldest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript that cannot be read is passed over rather than read as empty.",
    },
  ],
} as const satisfies Module
