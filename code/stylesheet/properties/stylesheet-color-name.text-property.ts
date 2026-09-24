import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const stylesheetColorName = {
  id: "01a0d58f-e043-7ada-bcb3-2cb8b31b1116",
  type: "page-type/text-property",
  slug: "stylesheet-color-name",
  propertySlug: "name",
  definition: "the custom property a stylesheet writes a color to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
