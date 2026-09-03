import type { UrlProperty } from "@akasha/pages-system/url-property"

export type RelationshipLinkedinUrl = string

export const relationshipLinkedinUrl = {
  id: "01a0658a-f4df-7c3e-9ef7-2e787ffbb264",
  pageTypeSlug: "url-property",
  slug: "relationship-linkedin-url",
  propertySlug: "relationship-linkedin-url",
  definition: "this person's LinkedIn page",
  max: 100,
} as const satisfies UrlProperty
