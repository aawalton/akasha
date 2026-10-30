import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const groupGranularity = {
  id: "01a0680d-4d00-7009-8c62-3f7a1d5b410a",
  type: "page-type/select-property",
  slug: "group-granularity",
  propertySlug: "group-granularity",
  definition: "the span of time a group of a view covers",
  values: ["day", "week", "month", "year"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a view gathering by a date states a granularity.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:14:57.280Z",
  updatedAt: "2026-10-30T17:38:23.640Z",
} as const satisfies SelectProperty
