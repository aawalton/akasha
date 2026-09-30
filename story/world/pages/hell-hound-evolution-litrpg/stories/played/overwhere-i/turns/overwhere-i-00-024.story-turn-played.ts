import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00024 = {
  id: "01a0f221-99c5-7fd4-867f-3bc81de52393",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-024",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 24,
  stepStatus: "step-status/game-master",
  action: "I pick up the tusks and bring them back to town for the bounty.",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-greyfen-beasts",
    "place/overwhere-i-fenwatch",
  ],
} as const satisfies StoryTurnPlayed
