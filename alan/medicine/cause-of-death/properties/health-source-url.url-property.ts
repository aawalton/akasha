import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const healthSourceUrl = {
  id: "01a183bf-b6a0-7ad5-8962-3466ed641eb4",
  type: "page-type/url-property",
  slug: "health-source-url",
  propertySlug: "url",
  definition: "where the published work a health figure is taken from can be read",
  maxLength: 500,
  types: "ts",
  createdAt: "2026-10-28T18:22:21.854Z",
  updatedAt: "2026-10-28T18:22:21.854Z",
} as const satisfies UrlProperty
