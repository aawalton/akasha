import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const effortLevel = {
  id: "01a06861-f664-75ef-9d6e-47a09eef368b",
  type: "page-type/text-property",
  slug: "effort-level",
  propertySlug: "effort-level",
  definition: "how much work the agent in a seat does before the agent sends a message",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
