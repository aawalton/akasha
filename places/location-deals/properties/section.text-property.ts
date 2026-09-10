import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Section = string

export const section = {
  id: "01a06585-5fc5-7674-a5de-f609d4e6fecd",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "section",
  propertySlug: "section",
  definition: "the heading the source lists the offer under",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty
