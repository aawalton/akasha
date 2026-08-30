import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Feed = string

export const feed = {
  id: "01a05480-1c8a-7277-987d-f4e91c56d32f",
  pageTypeSlug: "text-property",
  slug: "feed",
  propertySlug: "feed",
  definition: "where a widget fetches the readings it draws",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
