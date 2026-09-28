import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGarna = {
  id: "01a0e9fb-8739-75a6-81c2-9c3a17784bfa",
  type: "page-type/lore",
  slug: "otherwhere-v-garna",
  title: "Garna",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-garna",
  facts: [
    {
      fact: "Garna is a Questor of Sarya's grid: androgynous, bald, clipped and intellectual.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garna is a logistician, analyst, spy and deadeye.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garna has a Talent to manifest ranged weapons already in flight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Garna says few of Davrar\'s powerful people are disciplined, and swears "By Edes."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garna is regal; Kaelis of the Ashen Accord is an old friend.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garna and Ushia work together about once an Ending, with amazing results.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Garna is in a long contest with Ogarius of Badud's grid, who holds Estefar.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
