import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type SentFrom = Slug

export const sentFrom = {
  id: "01a05f42-d941-7003-93f9-14f2e4d582f1",
  pageTypeSlug: "relation-property",
  slug: "sent-from",
  propertySlug: "from",
  definition: "the persona something is sent by",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
