import type { Module } from "@akasha/code-system/module"

export const synthDrift = {
  id: "01a06810-0b68-7951-a36a-4b0291df9b60",
  pageTypeSlug: "module",
  slug: "synth-drift",
  definition: "how a generated file on disk differs from what its synth file makes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generated file not on disk drifts rather than matching.",
    },
    {
      invariantKind: "departure",
      statement: "A drift names the first line the two differ at.",
    },
  ],
} as const satisfies Module
