import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type Proves = Slug

export const proves = {
  id: "01a0657f-5da8-74a3-b66c-654cacd91f41",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "proves",
  propertySlug: "proves",
  definition: "the proposition a proof attempts",
  targetPageType: "page-type/proposition",
} as const satisfies RelationProperty
