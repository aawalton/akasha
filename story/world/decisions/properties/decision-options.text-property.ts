import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const decisionOptions = {
  id: "01a06577-f385-78f5-b9ff-cdab7f5fd547",
  type: "page-type/text-property",
  slug: "decision-options",
  propertySlug: "options",
  definition: "the options open to a decision",
  maxLength: 20000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
