import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const patternGroups = {
  id: "01a0685e-89d5-791d-b381-a1bbde4021e9",
  pageTypeSlug: "module",
  slug: "pattern-groups",
  definition: "the movement patterns gathered by what a week owes and what region each trains",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every pattern named here is a value of the movement pattern property.",
    },
    {
      invariantKind: "departure",
      statement: "A grouping of patterns is stated once and read from here everywhere.",
    },
    {
      invariantKind: "departure",
      statement: "A week owes each required pattern once.",
    },
    {
      invariantKind: "absence",
      statement: "A pattern belongs to no region unless it trains that region and no other.",
    },
  ],
} as const satisfies Module
