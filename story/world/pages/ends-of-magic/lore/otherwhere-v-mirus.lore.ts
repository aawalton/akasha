import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVMirus = {
  id: "01a0e9fc-d638-7679-8df7-4ef541312977",
  type: "page-type/lore",
  slug: "otherwhere-v-mirus",
  title: "Mirus of the Silver",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-mirus",
  facts: [
    {
      fact: "Mirus of the Silver is a thin, bald elder Questor, Wizard of the Silver Tower of Kalis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He was a founding member of Kalis, the ancient empire that spread Insights freely.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He wears a silver robe and bears a floating staff wreathed in silver mist and time magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His magic picks apart enemy spells, bends space and time, and hurls disintegration.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He argued to ban sharing some Insights with mortals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season he is one of the elder Questors, rarely seen by mortals and far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
