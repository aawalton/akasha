import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const mobilityDerive = {
  id: "01a0685c-7d81-78d3-ad61-033e43fb5cdb",
  pageTypeSlug: "module",
  slug: "mobility-derive",
  definition: "the name a mobility reading is filed under, and which way a run of them is going",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading naming no side is named without one.",
    },
    {
      invariantKind: "departure",
      statement: "A trend is read from the oldest reading to the newest.",
    },
    {
      invariantKind: "departure",
      statement: "A trend over fewer than two readings is insufficient rather than flat.",
    },
    {
      invariantKind: "departure",
      statement: "A reading carrying no number is no part of a trend.",
    },
  ],
} as const satisfies Module
