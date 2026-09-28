import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiPlanetaryQuestChain = {
  id: "01a0e9c7-9b3a-7abe-bd48-a612fc98fcf5",
  type: "page-type/lore",
  slug: "otherwhere-ii-planetary-quest-chain",
  title: "The Fate of Earth and Rebuilding Civilization",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Rebuilding Civilization is a one-year bonus quest that starts fourteen days after the return.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Defeating a town, city or capital boss grants the right to found a settlement.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A capital starts with a Unique, two Rare, five Uncommon and 25 Common buildings and 500 points.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "New settlements cannot be founded within 25 miles of another.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "City points buy walls, lights, running water, training grounds and much more.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "City points not spent by the end of the year are lost.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Settlements rise through seven tiers by completing city quests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tier 5 opens a portal network between allied cities.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tier 7 needs 50 mana wells, 7 Rare buildings, 5 tier-2 residents and 50,000 citizens.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Emergency quests call for help when a settlement's core is about to fall.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
