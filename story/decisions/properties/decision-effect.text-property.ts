import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DecisionEffect = string

export const decisionEffect = {
  id: "01a06577-f385-78a2-87c3-1adf32145189",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "decision-effect",
  propertySlug: "effect",
  definition: "what a decision changed",
  maxLength: 6000,
  nameFormat: null,
} as const satisfies TextProperty
