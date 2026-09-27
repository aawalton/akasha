import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00012 = {
  id: "01a0e353-b387-73a2-ab4d-6739abb9ec02",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-012",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 12,
  turnStatus: "turn-status/world-builder",
  action:
    '"Okay, I\'m glad you have good boundaries. With the aphantasia I have no sense of time, which makes it hard for me to tell when the timing is right, but I\'m happy to let you set the pace. I really do like you."\n\n"So, you read LitRPG? What\'s one of your favorite series?"',
} as const satisfies StoryTurnPlayed
