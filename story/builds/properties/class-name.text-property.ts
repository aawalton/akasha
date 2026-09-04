import type { TextProperty } from "@akasha/pages-system/text-property"

export type ClassName = string

export const className = {
  id: "01a06577-f385-7f21-8918-e4d6e827f511",
  pageTypeSlug: "text-property",
  slug: "class-name",
  propertySlug: "class-name",
  definition: "the class a character is playing as",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
