import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type IdentityStatementValue = Slug

export const identityStatementValue = {
  id: "01a0658a-739f-7952-921f-4eb125f1399c",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "identity-statement-value",
  propertySlug: "identity-statement-value",
  definition: "the value the statement serves",
  targetPageType: "page-type/value",
} as const satisfies RelationProperty
