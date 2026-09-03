import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RelationshipTopicSlugs = Slug

export const relationshipTopicSlugs = {
  id: "01a0658a-f4df-77e1-b24c-a55026ec10ca",
  pageTypeSlug: "relation-property",
  slug: "relationship-topic-slugs",
  propertySlug: "relationship-topic-slugs",
  definition: "the subjects Alan and this person talk about",
  targetPageTypeSlug: "page-type/relationship-topic",
} as const satisfies RelationProperty
