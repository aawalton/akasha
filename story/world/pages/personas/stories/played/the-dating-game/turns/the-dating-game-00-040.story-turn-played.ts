import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00040 = {
  id: "01a0e7fb-1d4a-75c1-920c-d9732b54ca83",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-040",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 40,
  turnStatus: "turn-status/game-master",
  action:
    'I get up for the day, dress is slacks and my "adventurer shirt" that I wear to ren faires, and then hike up Rock Canyon to the clearing I recognized from my dream.',
  lore: ["lore/the-dating-game-aelwyn", "place/the-dating-game-rock-canyon"],
} as const satisfies StoryTurnPlayed
