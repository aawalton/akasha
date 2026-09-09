import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ReplacesStatements = Slug

export const replacesStatements = {
  id: "01a0658a-739f-799b-8d3d-ce0fdec966a9",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "replaces-statements",
  propertySlug: "replaces-statements",
  definition: "the statements this one supersedes",
  targetPageType: "page-type/identity-statement",
} as const satisfies RelationProperty
