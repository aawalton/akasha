import type { DifficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.types.ts"

export const hard = {
  id: "01a17edd-18fd-7996-8575-fd0d735e6918",
  type: "page-type/difficulty-level",
  slug: "hard",
  title: "Hard",
  oddsModifier: -10,
  failureCeiling:
    "A failure can leave an injury that lasts or lose an item for good; the player's character does not die.",
  gameMasterStance: [
    "Roll most plans that meet resistance.",
    "Complications come often, and time works against the player's character.",
    "Other characters guard their interests and remember a slight.",
  ],
  createdAt: "2026-10-27T19:36:21.500Z",
  updatedAt: "2026-10-27T20:35:07.596Z",
} as const satisfies DifficultyLevel
