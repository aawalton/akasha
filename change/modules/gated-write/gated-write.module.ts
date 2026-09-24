import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gatedWrite = {
  id: "01a06949-b281-7b8d-ae3f-bc451ba4ebb7",
  type: "page-type/module",
  slug: "gated-write",
  definition: "what came of a write through the gate, and the reason where it was refused",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a refusal has a reason with that refusal.",
    },
  ],
} as const satisfies Module
