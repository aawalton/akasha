import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const apiBase = {
  id: "01a0a211-d7d7-7a81-84e4-d12435599b73",
  type: "page-type/url-property",
  slug: "api-base",
  propertySlug: "api-base",
  definition: "where code sends messages to a model provider",
  maxLength: 200,
  types: "ts",
} as const satisfies UrlProperty
