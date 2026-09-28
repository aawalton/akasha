import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00050 = {
  id: "01a0e841-9406-73cd-9d79-6e1229b96c3c",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-050",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 50,
  turnStatus: "turn-status/game-master",
  action:
    '"Sounds great. Bye Aelwyn!" I walk back home and get myself some lunch, then go for a walk around my neighborhood again.',
  lore: ["place/the-dating-game-apple-avenue"],
} as const satisfies StoryTurnPlayed
