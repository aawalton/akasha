import type { UrlProperty } from "@akasha/pages-system/url-property"

export type Feed = string

export const feed = {
  id: "01a05480-1c8a-7277-987d-f4e91c56d32f",
  pageTypeSlug: "url-property",
  slug: "feed",
  propertySlug: "feed",
  definition: "where a widget fetches the readings it draws",
  max: 100,
} as const satisfies UrlProperty
