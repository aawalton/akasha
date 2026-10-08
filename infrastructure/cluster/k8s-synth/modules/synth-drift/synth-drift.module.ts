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
  createdAt: "2026-09-03T16:17:57.096Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
