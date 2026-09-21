import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const release = {
  id: "01a0c52c-ab6d-79fd-aa0f-b2415f5c5713",
  type: "page-type/relation-property",
  slug: "release",
  propertySlug: "release",
  definition: "the release carrying a track",
  targetPageType: "page-type/release",
  types: "ts",
} as const satisfies RelationProperty
