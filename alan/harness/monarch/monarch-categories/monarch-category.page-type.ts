import type { PageType } from "@akasha/pages-system/page-type"
import type { MonarchRecord } from "../monarch-records/monarch-record.page-type.ts"
import type { CategoryGroup } from "./properties/category-group.text-property.ts"
import type { CategoryGroupType } from "./properties/category-group-type.select-property.ts"

export type MonarchCategory = MonarchRecord & {
  categoryGroup?: CategoryGroup
  categoryGroupType?: CategoryGroupType
}

export const monarchCategory = {
  id: "01a0680a-1a00-700c-9f28-6e4a7b2d110c",
  pageTypeSlug: "page-type",
  slug: "monarch-category",
  definition: "what a transaction counts as, from groceries to salary",
  pluralSlug: "monarch-categories",
  extendsSlug: ["page-type/monarch-record"],
  partSlugs: ["select-property/category-group-type", "text-property/category-group"],
  properties: [
    { pagePropertySlug: "category-group", required: false, many: false },
    { pagePropertySlug: "category-group-type", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A category is partly a choice about which budget the money should land in rather than only a fact about what was bought.",
    },
    {
      invariantKind: "departure",
      statement: "An archived category takes no rule.",
    },
    {
      invariantKind: "departure",
      statement: "A category is named as Monarch titles it.",
    },
    {
      invariantKind: "gap",
      statement: "A merge or a rename in Monarch warns nobody here.",
    },
    {
      invariantKind: "departure",
      statement: "A category standing without a group is one Alan wrote and Monarch never held.",
    },
  ],
} as const satisfies PageType
