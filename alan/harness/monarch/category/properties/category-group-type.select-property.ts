import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const categoryGroupType = {
  id: "01a0680a-1a00-700b-a4e7-8b5d1c9f110b",
  type: "page-type/select-property",
  slug: "category-group-type",
  propertySlug: "category-group-type",
  definition: "how money moves in the transactions of a group of Monarch categories",
  values: ["expense", "income", "transfer"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A transfer moves money the household already holds from one account to another.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-10-30T15:48:22.379Z",
} as const satisfies SelectProperty
