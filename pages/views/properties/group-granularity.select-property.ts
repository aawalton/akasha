import type { SelectProperty } from "@akasha/pages/select-property"

export const groupGranularity = {
  id: "01a0680d-4d00-7009-8c62-3f7a1d5b410a",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "group-granularity",
  propertySlug: "group-granularity",
  definition: "how wide a stretch of time one group of a view covers",
  values: ["day", "week", "month", "year"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a view gathering by a date states a granularity.",
    },
  ],
} as const satisfies SelectProperty

export type GroupGranularity = (typeof groupGranularity.values)[number]
