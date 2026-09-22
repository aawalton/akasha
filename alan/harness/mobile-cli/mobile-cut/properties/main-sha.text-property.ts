import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const mainSha = {
  id: "01a0685d-b81f-7d1c-94f4-c00e55e583d2",
  type: "page-type/text-property",
  slug: "main-sha",
  propertySlug: "main-sha",
  definition: "a cut's commit of the main repo",
  maxLength: 40,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
