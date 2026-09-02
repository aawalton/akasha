import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData12 = {
  id: "01a06131-abb5-755c-b57c-4eaff9cc6cbe",
  pageTypeSlug: "module",
  slug: "metrics-data-12",
  definition: "character stats overcharged-damage through resistance-flame",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
