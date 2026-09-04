import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { SortOrder } from "./properties/sort-order.text-property.ts"

export type ReadoutGroup = Domain & {
  sortOrder?: SortOrder
}

export const readoutGroup = {
  id: "01a05446-e75e-7657-acda-566edc2b182e",
  pageTypeSlug: "page-type",
  slug: "readout-group",
  definition: "the readings drawn together",
  pluralSlug: "readout-groups",
  partSlugs: [
    "number-property/figure-max-length",
    "readout-group/attributes",
    "readout-group/categorization",
    "readout-group/claude-usage",
    "readout-group/inboxes",
    "readout-group/safety",
    "readout-group/surplus",
    "readout-group/upkeep",
    "readout-group/values",
    "text-property/sort-order",
  ],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "sort-order", required: false, many: false, default: "label" }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The words a group is drawn under are its definition rather than a label of its own.",
    },
  ],
} as const satisfies PageType
