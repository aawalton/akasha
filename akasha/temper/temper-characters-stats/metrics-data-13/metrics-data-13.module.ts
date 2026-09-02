import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData13 = {
  id: "01a06131-abb6-7c3c-b378-4ee9a5919903",
  pageTypeSlug: "module",
  slug: "metrics-data-13",
  definition: "character stats resistance-frost through stamina-block-cost",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
