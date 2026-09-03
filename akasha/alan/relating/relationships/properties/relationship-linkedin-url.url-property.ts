import type { UrlProperty } from "@akasha/pages-system/url-property"

export type RelationshipLinkedinUrl = string

export const relationshipLinkedinUrl = {
  id: "01a06594-c6e2-7c48-9515-6f4c9b8f3a29",
  pageTypeSlug: "url-property",
  slug: "relationship-linkedin-url",
  propertySlug: "relationship-linkedin-url",
  definition: "this person's LinkedIn page",
  max: 100,
} as const satisfies UrlProperty
