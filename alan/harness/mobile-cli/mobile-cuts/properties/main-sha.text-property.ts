import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type MainSha = string

export const mainSha = {
  id: "01a0685d-b81f-7d1c-94f4-c00e55e583d2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "main-sha",
  propertySlug: "main-sha",
  definition: "the commit of the main repo a cut was built from",
  maxLength: 40,
  nameFormat: null,
} as const satisfies TextProperty
