import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00009 = {
  id: "01a0e333-2548-708a-8fc8-fd138690a37e",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-009",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 9,
  turnStatus: "turn-status/game-master",
  action:
    "I squeeze back and hold her hand while we walk. \"Wow, three thousand years. So, what do you do to pass the time? I've thought a lot about what I'd do with endless time, since that's how my life feels anyways. I have a goal to learn everything, I read a lot of books, sometimes watch shows and movies, especially anime, listen to music. What are you into?\"",
  lore: ["lore/the-dating-game-echo"],
} as const satisfies StoryTurnPlayed
