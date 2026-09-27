import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00024 = {
  id: "01a0e3de-dd9d-730f-86df-2d5887b069f4",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-024",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 24,
  turnStatus: "turn-status/game-master",
  action:
    "Rather than go home, I’m feeling social still, so I go for a walk around my neighborhood instead",
  lore: ["lore/the-dating-game-grace"],
} as const satisfies StoryTurnPlayed
