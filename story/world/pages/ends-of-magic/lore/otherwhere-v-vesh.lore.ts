import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVVesh = {
  id: "01a0e9fd-9171-782a-885f-db3a65da3429",
  type: "page-type/lore",
  slug: "otherwhere-v-vesh",
  title: "Vesh",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-vesh",
  facts: [
    {
      fact: "Vesh is an elder Questor, a giant in blackened armor who may have no body inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vesh is a swordsman, among the most skilled fighters on Davrar, who knows every fighter of note.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vesh trained Sarya and has killed twenty-three blights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Even the swift Questor Brox avoids Vesh.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Vesh is one of the elder Questors, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
