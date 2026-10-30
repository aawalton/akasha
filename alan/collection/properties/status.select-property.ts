import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const status = {
  id: "01a063de-2c60-7011-92a6-0aefa2934d59",
  type: "page-type/select-property",
  slug: "status",
  propertySlug: "status",
  definition: "the kind of progress a person has with a collection",
  values: [
    "not-started",
    "in-progress",
    "following",
    "paused",
    "completed",
    "not-applicable",
    "archived",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection nobody will ever work through is `not-applicable`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection put out of sight is `archived`.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T20:44:59.872Z",
  updatedAt: "2026-10-30T15:13:18.190Z",
} as const satisfies SelectProperty
