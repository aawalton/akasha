import type { DifficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.types.ts"

export const veryEasy = {
  id: "01a17edd-18fd-7a0d-ba10-ebf1ee0c6586",
  type: "page-type/difficulty-level",
  slug: "very-easy",
  title: "Very Easy",
  oddsModifier: 4,
  failureCeiling:
    "A failure is a setback, and the story moves on; nothing is lost and no hurt outlasts the scene.",
  gameMasterStance: [
    "A sensible plan works without a roll; roll only a long shot.",
    "Trouble is rare and gives warning.",
    "Other characters are trusting and slow to see through the player's character.",
  ],
  createdAt: "2026-10-27T19:36:21.500Z",
  updatedAt: "2026-10-27T19:36:21.500Z",
} as const satisfies DifficultyLevel
