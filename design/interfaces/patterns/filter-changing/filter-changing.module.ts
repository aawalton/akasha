import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const filterChanging = {
  id: "01a090ec-d6a6-7001-9492-6e84f3f7dfe4",
  pageTypeSlug: "module",
  type: "module",
  slug: "filter-changing",
  definition: "the handler a search box or a sort control hands its change to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A control's change is written as the one value that control names.",
    },
    {
      invariantKind: "departure",
      statement: "A sort is written as the field and the direction together.",
    },
    {
      invariantKind: "departure",
      statement: "The field a sort is by is a value handed in rather than a set named here.",
    },
  ],
} as const satisfies Module
