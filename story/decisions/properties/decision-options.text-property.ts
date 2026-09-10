import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DecisionOptions = string

export const decisionOptions = {
  id: "01a06577-f385-78f5-b9ff-cdab7f5fd547",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "decision-options",
  propertySlug: "options",
  definition: "what a decision could have settled on",
  maxLength: 20000,
  nameFormat: null,
} as const satisfies TextProperty
