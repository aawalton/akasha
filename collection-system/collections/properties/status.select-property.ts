import type { SelectProperty } from "@akasha/pages-system/select-property"

export const status = {
  id: "01a063de-2c60-7011-92a6-0aefa2934d59",
  pageTypeSlug: "select-property",
  slug: "status",
  propertySlug: "status",
  definition: "how far a person has got with a collection",
  values: [
    "not-started",
    "in-progress",
    "following",
    "paused",
    "completed",
    "not-applicable",
    "archived",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection nobody will ever work through is `not-applicable`.",
    },
    {
      invariantKind: "departure",
      statement: "A collection put out of sight is `archived`.",
    },
  ],
} as const satisfies SelectProperty

export type Status = (typeof status.values)[number]
