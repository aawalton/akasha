import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const healthSourceUrl = {
  id: "01a183bf-b6a0-7ad5-8962-3466ed641eb4",
  type: "page-type/url-property",
  slug: "health-source-url",
  propertySlug: "url",
  definition: "a link to the published work a number about health comes from",
  maxLength: 500,
  types: "ts",
  createdAt: "2026-10-28T18:22:21.854Z",
  updatedAt: "2026-10-30T16:11:05.350Z",
} as const satisfies UrlProperty
