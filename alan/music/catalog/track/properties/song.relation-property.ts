import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const song = {
  id: "01a0b70d-7385-7c49-bc32-05c068858f24",
  type: "page-type/relation-property",
  slug: "song",
  propertySlug: "song",
  definition: "the song a track records",
  targetPageType: "page-type/song",
  types: "ts",
  createdAt: "2026-09-19T00:25:07.205Z",
  updatedAt: "2026-09-22T13:54:48.000Z",
} as const satisfies RelationProperty
