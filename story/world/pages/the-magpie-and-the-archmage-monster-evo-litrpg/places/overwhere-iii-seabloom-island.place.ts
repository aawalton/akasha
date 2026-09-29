import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiSeabloomIsland = {
  id: "01a0ed2f-54b6-7e2e-ba61-79c4aaeff921",
  type: "page-type/place",
  slug: "overwhere-iii-seabloom-island",
  title: "Seabloom Island",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    { to: "place/overwhere-iii-abylport", way: "About an hour's sail back to Abylport." },
    {
      to: "place/overwhere-iii-thalasarra",
      way: "Ten minutes' flight out past sight of land, then a deep dive.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "Seabloom Island lies about an hour's sail from Abylport, away from the corruption island.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It seems uninhabited, with a small harbor, jungle, fruit trees, monkeys and birds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has a waterfall and an orchard-like grove.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Old stone ruins sit on the island.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Skittish, harmless fishpeople live along its shore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An earth mana node lies deep inland, and the island grows lush around it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An earthmage cyclops and his jungle giantesses once ruled the node; they are dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Workers have come to clean up the jungle since the fight.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
