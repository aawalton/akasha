import type { UrlProperty } from "@akasha/pages-system/url-property"

export type Link = string

export const link = {
  id: "01a065a1-49b7-76f2-8bfb-4513bba0346d",
  pageTypeSlug: "url-property",
  slug: "link",
  propertySlug: "link",
  definition: "where Alan goes to do it",
  max: 100,
} as const satisfies UrlProperty
