import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type WorldWindow = Slug

export const worldWindow = {
  id: "01a0879d-eb37-7586-a1fe-8a92fe3b3e17",
  pageTypeSlug: "relation-property",
  slug: "world-window",
  propertySlug: "world",
  definition: "the world something is of",
  targetPageType: "page-type/world",
} as const satisfies RelationProperty
