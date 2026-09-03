import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ProvesSlug = Slug

export const provesSlug = {
  id: "01a0657f-5da8-74a3-b66c-654cacd91f41",
  pageTypeSlug: "relation-property",
  slug: "proves-slug",
  propertySlug: "proves-slug",
  definition: "the proposition a proof attempts",
  targetPageTypeSlug: "page-type/proposition",
} as const satisfies RelationProperty
