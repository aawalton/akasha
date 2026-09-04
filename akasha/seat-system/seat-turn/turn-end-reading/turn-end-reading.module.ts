import type { Module } from "@akasha/code-system/module"

export const turnEndReading = {
  id: "01a069c7-5c5f-70a5-9a8a-4429e44dc00a",
  pageTypeSlug: "module",
  slug: "turn-end-reading",
  definition: "one ended turn read for whether its ending will annoy the seat's principal",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading that cannot settle allows the turn end.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal quoting no line of the conduct is read as allowing.",
    },
  ],
} as const satisfies Module
