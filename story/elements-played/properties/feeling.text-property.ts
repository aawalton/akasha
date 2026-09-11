import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const feeling = {
  id: "01a06828-cb94-75a3-bc5b-8a59e104524e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "feeling",
  propertySlug: "feeling",
  definition: "how an element is",
  maxLength: 2000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
