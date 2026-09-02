import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData05 = {
  id: "01a06131-abb1-750d-93d7-77a1e2be5c8e",
  pageTypeSlug: "module",
  slug: "metrics-data-05",
  definition: "character stats effective-power-spell through ha-frost-spell-damage",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
