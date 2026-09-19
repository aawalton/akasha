import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const song = {
  id: "01a0b70d-7385-7c49-bc32-05c068858f24",
  type: "page-type/relation-property",
  slug: "song",
  propertySlug: "song",
  definition: "the song a track is a recording of",
  targetPageType: "page-type/song",
  types: "ts",
} as const satisfies RelationProperty
