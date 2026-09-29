import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiClara = {
  id: "01a0ed30-60ca-7d22-b1d2-1bd0e6e1d3bc",
  type: "page-type/lore",
  slug: "overwhere-iii-clara",
  title: "Clara",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-clara",
  facts: [
    {
      fact: "Clara is the Quest Assignment receptionist of the Cyene Adventurers Guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has long platinum hair, a professional smile and a rehearsed voice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She gives newcomers kind warnings about the dangers of their quests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She registered Serena Rembrack's party and its familiar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She told Damien Stolte that a familiar in the Guild was nothing new.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She knows the Guild's ranks and quests by heart: copper, bronze, silver and up.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Now she is at her desk in the Cyene Guild hall.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
