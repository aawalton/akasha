import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type IdentityStatementValueSlug = Slug

export const identityStatementValueSlug = {
  id: "01a0658a-739f-7952-921f-4eb125f1399c",
  pageTypeSlug: "relation-property",
  slug: "identity-statement-value-slug",
  propertySlug: "identity-statement-value-slug",
  definition: "the value the statement serves",
  targetPageTypeSlug: "page-type/value",
} as const satisfies RelationProperty
