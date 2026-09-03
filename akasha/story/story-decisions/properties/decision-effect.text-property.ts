import type { TextProperty } from "@akasha/pages-system/text-property"

export type DecisionEffect = string

export const decisionEffect = {
  id: "01a06577-f385-78a2-87c3-1adf32145189",
  pageTypeSlug: "text-property",
  slug: "decision-effect",
  propertySlug: "effect",
  definition: "what a decision changed",
  max: 6000,
  nameFormatSlug: null,
} as const satisfies TextProperty
