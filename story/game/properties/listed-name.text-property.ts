import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const listedName = {
  id: "01a0c637-1345-7445-b47d-21cc7f1dee7c",
  type: "page-type/text-property",
  slug: "listed-name",
  propertySlug: "name",
  definition: "what a page's list calls one of the things in it",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
