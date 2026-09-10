import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const mobilityReading = {
  id: "01a06558-36e9-75e2-bcf3-ce91fd6e945b",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "mobility-reading",
  definition: "one measurement of how far a joint moved on a day",
  pluralSlug: "mobility-readings",
  extends: ["page-type/page"],
  parts: [
    "calendar-date-property/mobility-reading-date",
    "number-property/mobility-reading-value-num",
    "select-property/context",
    "select-property/mobility-reading-metric",
    "select-property/side",
    "text-property/mobility-reading-value-text",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/context", required: true, many: false },
    {
      pageProperty: "calendar-date-property/mobility-reading-date",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/mobility-reading-metric", required: true, many: false },
    { pageProperty: "select-property/side", required: true, many: false },
    {
      pageProperty: "number-property/mobility-reading-value-num",
      required: false,
      many: false,
    },
    { pageProperty: "text-property/mobility-reading-value-text", required: true, many: false },
    { pageProperty: "text-property/note", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A reading names no session the reading was taken in.",
    },
    {
      invariantKind: "departure",
      statement: "A reading always has a human read of the measurement.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading has a number beside its human read where the metric is measured in numbers.",
    },
  ],
  types: "ts",
} as const satisfies PageType
