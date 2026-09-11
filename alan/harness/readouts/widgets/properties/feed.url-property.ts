import type { UrlProperty } from "akasha/pages/url-properties/url-property.page-type.types.ts"

export const feed = {
  id: "01a05480-1c8a-7277-987d-f4e91c56d32f",
  type: "url-property",
  slug: "feed",
  propertySlug: "feed",
  definition: "where a widget fetches the readings it draws",
  maxLength: 100,
  types: "ts",
} as const satisfies UrlProperty
