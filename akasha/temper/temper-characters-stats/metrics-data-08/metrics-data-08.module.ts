import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData08 = {
  id: "01a06131-abb4-74d9-a412-b1aedc769695",
  pageTypeSlug: "module",
  slug: "metrics-data-08",
  definition: "character stats healing-done-single-target through la-flame-spell-damage",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
