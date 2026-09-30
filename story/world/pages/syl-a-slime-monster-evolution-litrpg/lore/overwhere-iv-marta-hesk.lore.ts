import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvMartaHesk = {
  id: "01a0ed2c-5a73-7ebe-9186-99c35d97e0fd",
  type: "page-type/lore",
  slug: "overwhere-iv-marta-hesk",
  title: "Marta Hesk",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    { fact: "Identify shows Marta Hesk as Human LV 9.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Marta mothers every stray who comes through her door.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She lost her son to what the town believes were wolves in the Tangle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marta hears all the gossip in Millbrook and passes most of it on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marta at the Brook & Barrel is kind to strays and sees them fed.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
    {
      fact: "Marta takes the spear-skill tale whole, and will have it round the square by supper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Once Marta spreads it, the town talks of a spear trick, and not of magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marta warms to anyone who kills what lurks in the Tangle, for it took her son.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marta would press Nala's three copper back: a goblin-killer's first meal is on the house.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
