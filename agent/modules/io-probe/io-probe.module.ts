import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ioProbe = {
  id: "01a0695a-d2ea-7a83-ac29-18a8a68f3c6d",
  type: "page-type/module",
  slug: "io-probe",
  definition: "how code reads the transcripts of an agent",
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
  createdAt: "2026-09-03T22:19:15.050Z",
  updatedAt: "2026-10-19T19:36:59.400Z",
} as const satisfies Module
