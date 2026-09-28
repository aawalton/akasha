import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLirenVail = {
  id: "01a0e9fb-fb54-7acd-9e5f-5b5a60b21a64",
  type: "page-type/lore",
  slug: "otherwhere-v-liren-vail",
  title: "Liren Vail",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-liren-vail",
  facts: [
    {
      fact: "Liren Vail is a young, dark-skinned Questor of the Ashen Accord and a void mage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is anxious and analytical, and an apprentice pilot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season he is on the Ashen Accord's home continent, which he has never left.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
