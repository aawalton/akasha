import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type ReplacesStatements = List<Slug>

export const replacesStatements = {
  id: "01a0658a-739f-799b-8d3d-ce0fdec966a9",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "replaces-statements",
  propertySlug: "replaces-statements",
  definition: "the statements this one supersedes",
  targetPageType: "page-type/identity-statement",
} as const satisfies RelationProperty
