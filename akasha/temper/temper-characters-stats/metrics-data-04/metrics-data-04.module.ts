import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData04 = {
  id: "01a06131-abb1-7e8a-9e70-a5c7592452d9",
  pageTypeSlug: "module",
  slug: "metrics-data-04",
  definition: "character stats defense-physical-dd-mitigation through effective-power",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
