import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sheetName = {
  id: "01a0c637-1345-7445-b47d-21cc7f1dee7c",
  type: "page-type/text-property",
  slug: "sheet-name",
  propertySlug: "name",
  definition: "what a sheet calls one of the things it lists",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
