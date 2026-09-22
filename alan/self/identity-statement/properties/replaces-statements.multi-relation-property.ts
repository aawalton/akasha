import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const replacesStatements = {
  id: "01a0658a-739f-799b-8d3d-ce0fdec966a9",
  type: "page-type/multi-relation-property",
  slug: "replaces-statements",
  propertySlug: "replaces-statements",
  definition: "the statements this one supersedes",
  targetPageType: "page-type/identity-statement",
  types: "ts",
} as const satisfies MultiRelationProperty
