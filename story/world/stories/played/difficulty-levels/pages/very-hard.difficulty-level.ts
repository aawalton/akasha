import type { DifficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.types.ts"

export const veryHard = {
  id: "01a17edd-18fe-78e2-9ea7-beb119722f8a",
  type: "page-type/difficulty-level",
  slug: "very-hard",
  title: "Very Hard",
  oddsModifier: -4,
  failureCeiling:
    "A failure can leave a lasting injury, lose an item for good, or kill the player's character.",
  gameMasterStance: [
    "Only a plan meeting no resistance works without a roll.",
    "Each failure brings the next problem with it.",
    "Other characters see through a bluff and act on what they learn.",
  ],
  createdAt: "2026-10-27T19:36:21.500Z",
  updatedAt: "2026-10-27T19:36:21.500Z",
} as const satisfies DifficultyLevel
