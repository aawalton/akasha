import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVMortal = {
  id: "01a0e9f6-6b00-73b2-8290-602a85fa08d5",
  type: "page-type/lore",
  slug: "otherwhere-v-mortal",
  title: "Mortal",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-mortal",
  facts: [
    {
      fact: "Mortal is the Questors' word for every being who is not a Questor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mortals die permanently, while Questors come back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Questors call Davrar\'s native mortals "creations of Davrar".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scholars hold that Davrar is the will of the world, helping thinking beings survive.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mortals are told at adulthood that Endings will come again.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mortal towns are built on the wreckage of past Endings; children play in broken forts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mortals never speak at a Questor Conclave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mortals serving Questors are often subservient, as in the inns and shops of Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mortals can gain classes, Talents and skills from Davrar as Questors do.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
