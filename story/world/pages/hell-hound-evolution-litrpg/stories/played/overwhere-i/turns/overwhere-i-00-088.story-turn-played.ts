import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00088 = {
  id: "01a0fe74-93da-7ac6-b373-9e93f1c926ec",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-088",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 88,
  stepStatus: "step-status/game-master",
  action:
    "I start tracking the mile and cart, keeping my mana around 80% full and using my mobility enhancements wherever it is higher.",
  lore: [
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-greyback-and-east-road",
  ],
} as const satisfies StoryTurnPlayed
