import type { Domain } from "../../domains/domains/domain.page-type.ts"

export const narrativeStoryTurnPromotion = {
  id: "01a0675b-16f4-75bf-bef9-7a513c9dd7d7",
  pageTypeSlug: "domain",
  slug: "narrative-story-turn-promotion",
  definition: "gathering played turns into a chapter",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn gathered into a chapter is no longer shown to the player as a turn.",
    },
  ],
} as const satisfies Domain
