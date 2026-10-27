import type { DifficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.types.ts"

export const normal = {
  id: "01a17edd-18fd-7857-9bfe-1a6cfabc0ac5",
  type: "page-type/difficulty-level",
  slug: "normal",
  title: "Normal",
  oddsModifier: 0,
  failureCeiling:
    "A failure can wound or cost an item, and either can be won back; the player's character does not die.",
  gameMasterStance: [
    "Roll where a plan could fairly fail.",
    "Pressure comes as the world would bring it.",
    "Other characters are as sharp as their lives have made them.",
  ],
  createdAt: "2026-10-27T19:36:21.500Z",
  updatedAt: "2026-10-27T19:36:21.500Z",
} as const satisfies DifficultyLevel
