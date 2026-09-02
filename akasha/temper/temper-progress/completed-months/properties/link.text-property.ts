import type { TextProperty } from "@akasha/pages-system/text-property"

export type Link = string

export const link = {
  id: "01a05fd3-4360-7c26-a6ea-561a0cb93053",
  pageTypeSlug: "text-property",
  slug: "link",
  propertySlug: "link",
  definition: "the address a task sends a reader to",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
