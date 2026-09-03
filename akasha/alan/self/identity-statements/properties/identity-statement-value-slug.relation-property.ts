import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type IdentityStatementValueSlug = Slug

export const identityStatementValueSlug = {
  id: "01a06575-c2b8-7ba0-93a4-b5f286d9514c",
  pageTypeSlug: "relation-property",
  slug: "identity-statement-value-slug",
  propertySlug: "identity-statement-value-slug",
  definition: "the value the statement serves",
  targetPageTypeSlug: "page-type/value",
} as const satisfies RelationProperty
