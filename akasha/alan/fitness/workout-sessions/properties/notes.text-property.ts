import type { TextProperty } from "@akasha/pages-system/text-property"

export type Notes = string

export const notes = {
  id: "01a06580-5ee5-7856-9c30-d554c2d132e7",
  pageTypeSlug: "text-property",
  slug: "notes",
  propertySlug: "notes",
  definition: "what the session found, written as it closed",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
