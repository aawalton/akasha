import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionMetrics = {
  id: "01a06152-c2cb-7faa-af35-b220143e5186",
  pageTypeSlug: "module",
  slug: "companion-metrics",
  definition: "every companion metric gathered into one table, keyed by metric id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is assembled from three runs rather than declared in one place.",
    },
    {
      invariantKind: "constraint",
      statement: "A metric carrying a formula is worked out after every metric the formula reads.",
    },
    {
      invariantKind: "absence",
      statement: "No companion build hash carries a metric's place in this table.",
    },
  ],
} as const satisfies Module
