import type { SelectProperty } from "@akasha/pages-system/select-property"

export const categoryGroupType = {
  id: "01a0680a-1a00-700b-a4e7-8b5d1c9f110b",
  pageTypeSlug: "select-property",
  slug: "category-group-type",
  propertySlug: "category-group-type",
  definition: "which way money runs through a category's group",
  values: ["expense", "income", "transfer"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transfer moves money the household already holds from one account to another.",
    },
  ],
} as const satisfies SelectProperty

export type CategoryGroupType = (typeof categoryGroupType.values)[number]
