import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00005 = {
  id: "01a0e30b-67a0-7a43-ae8b-2ab914c8b99b",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 5,
  turnStatus: "turn-status/game-master",
  action: "\"You're Echo? That's a really pretty name. I'm a big fan of unusual names.\"",
} as const satisfies StoryTurnPlayed
