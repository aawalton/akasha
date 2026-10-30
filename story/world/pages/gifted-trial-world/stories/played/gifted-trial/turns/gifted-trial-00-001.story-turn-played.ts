import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedTrial00001 = {
  id: "01a18d26-c309-702a-9d60-f2f28a4218fd",
  type: "page-type/story-turn-played",
  slug: "gifted-trial-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-trial"],
  position: 1,
  stepStatus: "step-status/game-master",
  action: "I sit up and take stock of the room around me, then check my Status.",
  lore: ["place/gifted-trial-world-womb"],
  createdAt: "2026-10-30T14:11:30.185Z",
  updatedAt: "2026-10-30T14:13:36.834Z",
} as const satisfies StoryTurnPlayed
