import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const hasSafetyPlan = {
  id: "01a18411-4183-7eda-b957-97c475949179",
  type: "page-type/boolean-property",
  slug: "has-safety-plan",
  propertySlug: "has-safety-plan",
  definition:
    "whether a person has a safety plan, or a monitoring system serving as one, for a suicidal crisis",
  types: "ts",
  createdAt: "2026-10-28T19:51:25.825Z",
  updatedAt: "2026-10-28T19:56:29.458Z",
} as const satisfies BooleanProperty
