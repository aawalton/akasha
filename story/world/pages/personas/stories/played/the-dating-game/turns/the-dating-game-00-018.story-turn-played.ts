import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00018 = {
  id: "01a0e38a-d500-7801-adc2-e493978d85b3",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-018",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 18,
  turnStatus: "turn-status/game-master",
  action:
    "I sit in the chair. \"Okay, you tell me what to do, I'm yours for as long as you want me. Otherwise, I'll gladly just listen.\"",
  lore: ["lore/the-dating-game-alan"],
} as const satisfies StoryTurnPlayed
