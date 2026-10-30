import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedTrial200007 = {
  id: "01a18dc9-68b2-75b1-b0d0-6b7ab4727ae2",
  type: "page-type/story-turn-played",
  slug: "gifted-trial2-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-trial2"],
  position: 7,
  stepStatus: "step-status/game-master",
  action: "I kick hard against the wall where the man's hand is pressing.",
  lore: ["place/gifted-trial2-world-womb"],
  createdAt: "2026-10-30T17:09:09.425Z",
  updatedAt: "2026-10-30T17:10:29.972Z",
} as const satisfies StoryTurnPlayed
