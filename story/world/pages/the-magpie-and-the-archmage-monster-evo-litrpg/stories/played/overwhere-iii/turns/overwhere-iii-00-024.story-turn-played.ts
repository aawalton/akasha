import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00024 = {
  id: "01a0f34a-a91a-746c-8eed-808612458478",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-024",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 24,
  stepStatus: "step-status/game-master",
  action:
    "I pull the stones out and sell him the three rabbits, and then take the 23 frostcaps and see if the Post will buy all 23.",
  lore: [
    "lore/overwhere-iii-wrenmark-beasts",
    "place/overwhere-iii-merrowgate",
    "place/overwhere-iii-merrowgate-guild-post",
    "place/overwhere-iii-wrenwood",
  ],
  endsAt: "2026-09-30T17:29:00.000Z",
} as const satisfies StoryTurnPlayed
