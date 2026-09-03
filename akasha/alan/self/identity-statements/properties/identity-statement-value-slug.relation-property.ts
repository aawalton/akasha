import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type IdentityStatementValueSlug = Slug

export const identityStatementValueSlug = {
  id: "01a06589-d12a-7bf8-a7f0-c5b1f1ad9a15",
  pageTypeSlug: "relation-property",
  slug: "identity-statement-value-slug",
  propertySlug: "identity-statement-value-slug",
  definition: "the value the statement serves",
  targetPageTypeSlug: "page-type/value",
} as const satisfies RelationProperty
