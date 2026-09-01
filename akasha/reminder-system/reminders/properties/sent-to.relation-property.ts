import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type SentTo = Slug

export const sentTo = {
  id: "01a05f42-d941-7002-b41d-b3dedda83287",
  pageTypeSlug: "relation-property",
  slug: "sent-to",
  propertySlug: "to",
  definition: "the persona something is sent to",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
