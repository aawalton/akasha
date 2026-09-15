import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const synthDrift = {
  id: "01a06810-0b68-7951-a36a-4b0291df9b60",
  type: "page-type/module",
  slug: "synth-drift",
  definition: "how a generated file on disk differs from what its synth file makes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A generated file not on disk drifts rather than matching.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drift names the first line the two differ at.",
    },
  ],
} as const satisfies Module
