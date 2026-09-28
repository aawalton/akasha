import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00047 = {
  id: "01a0e82e-b09b-7661-a482-b794fdc08b54",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-047",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 47,
  turnStatus: "turn-status/game-master",
  action: '"Great! How do I fix that?"',
  lore: ["lore/the-dating-game-aelwyn"],
} as const satisfies StoryTurnPlayed
