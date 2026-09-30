import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00054 = {
  id: "01a0f458-dfba-7666-aca0-4caff5ea25a2",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-054",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 54,
  stepStatus: "step-status/game-master",
  action:
    "I take the tokens for additional proof and then attune earth and air to scan the content of the den for any remaining wolves.",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "place/overwhere-i-the-greyfen",
  ],
} as const satisfies StoryTurnPlayed
