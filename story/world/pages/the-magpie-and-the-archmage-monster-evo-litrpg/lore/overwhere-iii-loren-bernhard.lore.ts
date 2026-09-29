import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiLorenBernhard = {
  id: "01a0ed30-60cb-7757-9996-b708a5af535e",
  type: "page-type/lore",
  slug: "overwhere-iii-loren-bernhard",
  title: "Loren Bernhard",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-loren-bernhard",
  facts: [
    {
      fact: "Loren Bernhard is Guildmaster of the Adventurers Guild of Abylport.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is large and bald, missing an eye, and of Level 62.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "He is one of Morgana's Elites.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Abylport is a port city larger than Cyene, a hub for adventurers, recovering from blight fog.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When the fog nearly lost Abylport, he sent expeditions and begged a Pillar's help.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "He raised Liora and Cee to Silver rank.", knowers: ["lore-disclosure/game-master"] },
    { fact: "Now he is in Abylport, at his Guild.", knowers: ["lore-disclosure/game-master"] },
  ],
  secrets: "jsonl",
} as const satisfies Lore
