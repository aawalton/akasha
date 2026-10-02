import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00097 = {
  id: "01a0fefb-d535-78fc-9016-3f8a540c40b4",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-097",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 97,
  stepStatus: "step-status/game-master",
  action:
    "I go over and pick up Ghost-Eye’s head from the cart, using a working of fire and earth to increase my strength, then follow the directions up",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-greyfen-alpha-2",
    "lore/overwhere-i-the-greyfen-alpha-2-2",
    "place/overwhere-i-wendlow",
  ],
} as const satisfies StoryTurnPlayed
