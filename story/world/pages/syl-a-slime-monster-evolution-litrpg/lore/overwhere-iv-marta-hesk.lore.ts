import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvMartaHesk = {
  id: "01a0ed2c-5a73-7ebe-9186-99c35d97e0fd",
  type: "page-type/lore",
  slug: "overwhere-iv-marta-hesk",
  title: "Marta Hesk",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Identify shows Marta Hesk as Human LV 9.",
      knowers: ["lore-disclosure/game-master"],
    },
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
  ],
  secrets: "jsonl",
} as const satisfies Lore
