import type { TextProperty } from "@akasha/pages-system/text-property"

export type DecisionOptions = string

export const decisionOptions = {
  id: "01a06577-f385-78f5-b9ff-cdab7f5fd547",
  pageTypeSlug: "text-property",
  slug: "decision-options",
  propertySlug: "options",
  definition: "what a decision could have settled on",
  max: 20000,
  nameFormatSlug: null,
} as const satisfies TextProperty
