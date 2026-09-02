import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData16 = {
  id: "01a06131-abb7-7132-8968-c0d7f7e54a52",
  pageTypeSlug: "module",
  slug: "metrics-data-16",
  definition: "character stats ultimate-ability-cost through ultimate-restore",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
