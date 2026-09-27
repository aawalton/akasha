import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00020 = {
  id: "01a0e3a1-f6b6-7332-b7d6-8e14285f822b",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-020",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 20,
  turnStatus: "turn-status/world-builder",
  action:
    "I reach out to shake her hand with a huge smile \"It's a date! I'll see you Saturday!\", then turn to leave.",
} as const satisfies StoryTurnPlayed
