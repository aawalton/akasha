import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVNierna = {
  id: "01a0e9fc-d638-7981-993d-8f894f2d99c6",
  type: "page-type/lore",
  slug: "otherwhere-v-nierna",
  title: "Nierna",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-nierna",
  facts: [
    {
      fact: "Nierna is a Questor of the Ashen Accord who has served on its board.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She disdains mortals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she is a long-standing member of the Ashen Accord, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
