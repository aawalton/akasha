import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const groupGranularity = {
  id: "01a0680d-4d00-7009-8c62-3f7a1d5b410a",
  type: "page-type/select-property",
  slug: "group-granularity",
  propertySlug: "group-granularity",
  definition: "how wide a stretch of time a group of a view covers",
  values: ["day", "week", "month", "year"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a view gathering by a date states a granularity.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
