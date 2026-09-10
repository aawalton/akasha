import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ReplacedByStatements = List<Slug>

export const replacedByStatements = {
  id: "01a0658a-739f-7a30-b80e-84746389acf7",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "replaced-by-statements",
  propertySlug: "replaced-by-statements",
  definition: "the statements superseding this one",
  targetPageType: "page-type/identity-statement",
} as const satisfies RelationProperty
