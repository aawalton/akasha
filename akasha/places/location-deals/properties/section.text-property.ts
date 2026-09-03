import type { TextProperty } from "@akasha/pages-system/text-property"

export type Section = string

export const section = {
  id: "01a06585-5fc5-7674-a5de-f609d4e6fecd",
  pageTypeSlug: "text-property",
  slug: "section",
  propertySlug: "section",
  definition: "the heading the source lists the offer under",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
