import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00014 = {
  id: "01a0f1a6-f5c4-7441-ac27-b3cd47b78143",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-014",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 14,
  stepStatus: "step-status/game-master",
  action:
    "I watch her with a bored expression and walk back with the cart, then go with her to get the reward money.",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-rowan-coalby",
    "lore/overwhere-i-sootjaw",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-fenwatch",
    "place/overwhere-i-greyback-and-east-road",
  ],
} as const satisfies StoryTurnPlayed
