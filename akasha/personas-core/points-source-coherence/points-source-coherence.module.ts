import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pointsSourceCoherence = {
  id: "01a05b70-a58d-7a88-969b-0e692ebd166e",
  pageTypeSlug: "module",
  slug: "points-source-coherence",
  definition: "the rules a persona's points-source fields must hold together by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A windowed source must name how the source aggregates.",
    },
    {
      invariantKind: "departure",
      statement: "An aggregate over bytes must name a path prefix.",
    },
  ],
} as const satisfies Module
