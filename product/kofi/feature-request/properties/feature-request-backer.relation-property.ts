import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const featureRequestBacker = {
  id: "01a0c4a7-faa9-7995-89f0-7109095bf2f5",
  type: "page-type/relation-property",
  slug: "feature-request-backer",
  propertySlug: "contributor",
  definition: "the contributor who committed points to a feature request",
  targetPageType: "page-type/contributor",
  types: "ts",
} as const satisfies RelationProperty
