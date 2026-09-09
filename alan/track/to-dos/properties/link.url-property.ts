import type { UrlProperty } from "@akasha/pages/url-property"

export type Link = string

export const link = {
  id: "01a065a1-49b7-76f2-8bfb-4513bba0346d",
  pageTypeSlug: "url-property",
  type: "url-property",
  slug: "link",
  propertySlug: "link",
  definition: "where Alan goes to do it",
  maxLength: 100,
} as const satisfies UrlProperty
