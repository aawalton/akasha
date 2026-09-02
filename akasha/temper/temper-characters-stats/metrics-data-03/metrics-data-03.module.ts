import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData03 = {
  id: "01a06131-abb0-7811-9515-8fb8732c9d8b",
  pageTypeSlug: "module",
  slug: "metrics-data-03",
  definition: "character stats damage-done-dot through defense-physical-aoe-mitigation",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
