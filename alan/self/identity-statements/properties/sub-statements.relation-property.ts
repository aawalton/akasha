import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type SubStatements = List<Slug>

export const subStatements = {
  id: "01a0658a-739f-7ad3-8836-aaf163131279",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "sub-statements",
  propertySlug: "sub-statements",
  definition: "the statements sitting under this one",
  targetPageType: "page-type/identity-statement",
} as const satisfies RelationProperty
