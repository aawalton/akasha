import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiMark = {
  id: "01a0ed30-60cb-745d-8997-f0e6c3a840a7",
  type: "page-type/lore",
  slug: "overwhere-iii-mark",
  title: "Mark",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-mark",
  facts: [
    {
      fact: "Mark is the young, lanky clerk of the Reward Claim desk of the Cyene Adventurers Guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is grumpy, but once slipped bonus money to Serena Rembrack's poor party.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His desk holds members' rewards like a bank until they claim them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He told Damien Stolte that Liora is a recognised Guild member he may not fight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Liora borrows his voice for words such as steal and reward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Now he is at his desk in the Cyene Guild hall.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
