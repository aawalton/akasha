import type { TextProperty } from "@akasha/pages-system/text-property"

export type ExternalLink = string

export const externalLink = {
  id: "01a06243-144b-7001-b0cb-71c719e9eb56",
  pageTypeSlug: "text-property",
  slug: "external-link",
  propertySlug: "external-link",
  definition: "the web address a page has at the provider it came from",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
