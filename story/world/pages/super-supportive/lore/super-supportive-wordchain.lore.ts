import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveWordchain = {
  id: "01a0e9fa-71c2-78ee-a483-d483f1a4fc5f",
  type: "page-type/lore",
  slug: "super-supportive-wordchain",
  title: "Wordchains",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-wordchain",
  facts: [
    {
      fact: "Non-Avowed humans can perform many wordchains; only Avowed can do magic beyond them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wordchains are an ancient, simple exchange, closer to contracts than to modern spellcraft.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Using wordchains well requires study of the Artonan language.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
