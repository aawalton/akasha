import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00021 = {
  id: "01a0e3c2-ce6b-745b-ba86-7e31f6a3edd8",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-021",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 21,
  turnStatus: "turn-status/game-master",
  action:
    "While I’m on campus, I decide to take a leisurely walk on the quiet trail next to the stream circling campus, halfway down the hill",
  lore: ["place/the-dating-game-byu-stream-trail"],
} as const satisfies StoryTurnPlayed
