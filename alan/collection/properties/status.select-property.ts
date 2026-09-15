import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const status = {
  id: "01a063de-2c60-7011-92a6-0aefa2934d59",
  type: "page-type/select-property",
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
      invariantKind: "invariant-kind/departure",
      statement: "A collection nobody will ever work through is `not-applicable`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A collection put out of sight is `archived`.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
