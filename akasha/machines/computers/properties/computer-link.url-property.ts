import type { UrlProperty } from "@akasha/pages-system/url-property"

export type ComputerLink = string

export const computerLink = {
  id: "01a0658c-329a-7e92-a679-6958e243a543",
  pageTypeSlug: "url-property",
  slug: "computer-link",
  propertySlug: "link",
  definition: "where its specification stands",
  max: 200,
} as const satisfies UrlProperty
