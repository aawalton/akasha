import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const partOfSpeech = {
  id: "01a0c565-aacc-7c06-a074-4e8a7bb4f241",
  type: "page-type/relation-property",
  slug: "part-of-speech",
  propertySlug: "part-of-speech",
  definition: "the job a word does in a phrase",
  targetPageType: "page-type/part-of-speech",
  types: "ts",
  createdAt: "2026-09-21T19:16:09.548Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies RelationProperty
