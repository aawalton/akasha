import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const readoutGroup = {
  id: "01a05446-e75e-7657-acda-566edc2b182e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "readout-group",
  definition: "the readings drawn together",
  pluralSlug: "readout-groups",
  parts: [
    "boolean-property/figure-off-scale",
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
  extends: ["page-type/domain"],
  properties: [
    {
      pageProperty: "text-property/sort-order",
      required: false,
      many: false,
      default: "label",
    },
    { pageProperty: "boolean-property/figure-off-scale", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The words a group is drawn under are its definition rather than a label of its own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
