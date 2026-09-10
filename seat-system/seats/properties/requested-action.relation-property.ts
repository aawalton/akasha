import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type RequestedAction = Slug

export const requestedAction = {
  id: "01a0542c-d18d-723c-8b98-1841c0eeef14",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "requested-action",
  propertySlug: "action",
  definition: "what a seat's supervisor has been asked to do",
  targetPageType: "page-type/supervisor-action",
} as const satisfies RelationProperty
