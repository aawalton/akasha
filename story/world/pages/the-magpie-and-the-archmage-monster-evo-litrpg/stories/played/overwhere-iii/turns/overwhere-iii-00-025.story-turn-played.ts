import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00025 = {
  id: "01a0f354-1e14-70f1-aba6-ea3a2bab4f46",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-025",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 25,
  stepStatus: "step-status/game-master",
  action:
    "I take them to the shop, then see if I can find Tobin to return his coat and repay double what he spent on me, then pay for a night at the inn from my own funds.",
  lore: [
    "lore/overwhere-iii-bet-harrow",
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-tobin-wick",
    "place/overwhere-iii-crook-and-candle",
    "place/overwhere-iii-merrowgate",
  ],
  endsAt: "2026-09-30T17:44:00.000Z",
} as const satisfies StoryTurnPlayed
