import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const release = {
  id: "01a0c52c-ab6d-79fd-aa0f-b2415f5c5713",
  type: "page-type/relation-property",
  slug: "release",
  propertySlug: "release",
  definition: "the release that carries a track",
  targetPageType: "page-type/release",
  types: "ts",
  createdAt: "2026-09-21T18:13:54.157Z",
  updatedAt: "2026-10-30T16:09:44.671Z",
} as const satisfies RelationProperty
