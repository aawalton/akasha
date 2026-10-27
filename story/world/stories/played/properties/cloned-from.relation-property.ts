import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const clonedFrom = {
  id: "01a17f32-5bc5-7e04-8d02-bafa7b417810",
  type: "page-type/relation-property",
  slug: "cloned-from",
  propertySlug: "cloned-from",
  definition: "the played story a played story was cloned from",
  targetPageType: "page-type/story-played",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone is played only by agents testing the engine, never offered to Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a story naming the story it was cloned from is removed as a clone.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T21:09:29.155Z",
  updatedAt: "2026-10-27T21:09:29.155Z",
} as const satisfies RelationProperty
