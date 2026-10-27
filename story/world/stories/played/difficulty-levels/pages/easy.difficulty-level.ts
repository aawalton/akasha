import type { DifficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.types.ts"

export const easy = {
  id: "01a17edd-18fd-7c05-b2a3-e6070e1a69d3",
  type: "page-type/difficulty-level",
  slug: "easy",
  title: "Easy",
  oddsModifier: 10,
  failureCeiling:
    "A failure costs time, coin or a lead; a hurt heals with rest, and nothing is lost for good.",
  gameMasterStance: [
    "A sensible plan mostly works without a roll; roll where the outcome is truly in doubt.",
    "Complications are few and mild.",
    "Other characters give the player's character the benefit of the doubt.",
  ],
  createdAt: "2026-10-27T19:36:21.500Z",
  updatedAt: "2026-10-27T20:35:07.596Z",
} as const satisfies DifficultyLevel
