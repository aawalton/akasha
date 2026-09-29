import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiBrakaar = {
  id: "01a0ed2e-c664-7df8-9d84-39dad19b1b8d",
  type: "page-type/lore",
  slug: "overwhere-iii-brakaar",
  title: "Lord Brakaar",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-brakaar",
  facts: [
    {
      fact: "Lord Brakaar is a high Elite of Cyene, a tax inspector of the Path of Iron Law.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His staff call him Your Excellency; commoners mock him as Lord Puffypants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He dresses gaudily, in puffy shirts and corset vests, his hair swirled like a banana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He lives in a red-brick mansion in Cyene's Inner City, decked with scrap-metal art.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He visits the Cyene Guild every quarter over its taxes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His magic-using household staff respect him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His special entry permit was stolen, and he had all Cyene searched for the thief.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His pride still wants the unusual bird behind the theft found.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Now he is in Cyene, at his duties.", knowers: ["lore-disclosure/game-master"] },
  ],
  secrets: "jsonl",
} as const satisfies Lore
