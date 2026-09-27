import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00004 = {
  id: "01a0e304-a845-7da8-b30a-7516322ca43d",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 4,
  turnStatus: "turn-status/game-master",
  action:
    "I like that she's walking close, and I bump my shoulder gently into hers from time to time. \"I'm Alan, what's your name?\"",
  lore: ["lore/the-dating-game-boulder-woman"],
} as const satisfies StoryTurnPlayed
