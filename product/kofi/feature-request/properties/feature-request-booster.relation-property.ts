import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const featureRequestBooster = {
  id: "01a0c4a7-faa9-7995-89f0-7109095bf2f5",
  type: "page-type/relation-property",
  slug: "feature-request-booster",
  propertySlug: "contributor",
  definition: "the contributor who boosted a feature request with points",
  targetPageType: "page-type/contributor",
  types: "ts",
  createdAt: "2026-09-21T15:48:58.153Z",
  updatedAt: "2026-09-21T23:18:09.000Z",
} as const satisfies RelationProperty
