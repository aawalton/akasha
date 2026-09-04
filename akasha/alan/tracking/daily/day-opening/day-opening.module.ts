import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayOpening = {
  id: "01a069c3-a82a-798b-b746-3c9dfa4f21fc",
  pageTypeSlug: "module",
  slug: "day-opening",
  definition: "which day an instant falls in, counted from the moment Alan's day opens",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "The blocks a day held are answered empty rather than read.",
    },
    {
      invariantKind: "gap",
      statement: "A day with no block read opens at the ESO day's own opening.",
    },
  ],
} as const satisfies Module
