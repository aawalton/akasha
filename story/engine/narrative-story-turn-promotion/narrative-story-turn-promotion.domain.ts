import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const narrativeStoryTurnPromotion = {
  id: "01a0675b-16f4-75bf-bef9-7a513c9dd7d7",
  type: "page-type/domain",
  slug: "narrative-story-turn-promotion",
  definition: "gathering played turns into a chapter",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn gathered into a chapter is no longer shown to the player as a turn.",
    },
  ],
  createdAt: "2026-09-03T13:00:18.036Z",
  updatedAt: "2026-09-19T01:07:10.000Z",
} as const satisfies Domain
