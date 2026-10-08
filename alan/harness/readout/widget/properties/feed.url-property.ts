import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const feed = {
  id: "01a05480-1c8a-7277-987d-f4e91c56d32f",
  type: "page-type/url-property",
  slug: "feed",
  propertySlug: "feed",
  definition: "where a widget fetches the readings it draws",
  maxLength: 100,
  types: "ts",
  createdAt: "2026-08-30T21:07:57.194Z",
  updatedAt: "2026-09-15T16:36:47.000Z",
} as const satisfies UrlProperty
