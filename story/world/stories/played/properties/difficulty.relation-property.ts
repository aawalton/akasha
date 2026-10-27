import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const difficulty = {
  id: "01a17edd-5e42-7d4e-8835-cb9b0e34d614",
  type: "page-type/relation-property",
  slug: "difficulty",
  propertySlug: "difficulty",
  definition: "the difficulty level a played story plays at",
  targetPageType: "page-type/difficulty-level",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story played naming no difficulty level plays at Normal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The player changes the level on the play screen, and it holds from the next turn.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T19:36:39.233Z",
  updatedAt: "2026-10-27T19:36:39.233Z",
} as const satisfies RelationProperty
