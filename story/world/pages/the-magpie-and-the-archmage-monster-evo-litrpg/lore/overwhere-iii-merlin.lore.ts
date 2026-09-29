import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiMerlin = {
  id: "01a0ed2f-3744-7284-b7d5-6f640b6a0046",
  type: "page-type/lore",
  slug: "overwhere-iii-merlin",
  title: "Merlin",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-merlin",
  facts: [
    {
      fact: "Merlin is the Pillar of Mystic Prism, a studious old man who treats magic as a science.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lucien is his eldest son and heir to his seat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He descends from the old nobility and wants the old order back; Renir calls it near-treason.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He was glad when Renir's magic stopped tainting things.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His family recruits students for Forestwind Mage Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Forestwind's Headmaster Horace favours the Path of Mystic Prism.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He keeps Elites of his own, as every Pillar does.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
