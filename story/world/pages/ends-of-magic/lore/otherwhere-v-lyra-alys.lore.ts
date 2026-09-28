import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLyraAlys = {
  id: "01a0e9ff-5953-7203-9c06-e90aab16eb65",
  type: "page-type/lore",
  slug: "otherwhere-v-lyra-alys",
  title: "Lyra Alys",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-lyra-alys",
  facts: [
    {
      fact: "Lyra Alys is a Questor duelist who fights with illusions and shape-changing gear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her dress becomes metallic-feathered scale armor, and her bracelets become weapons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She throws daggers that phase through magical protection and armor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is tied to Amoh's Seminary of Assassins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she plays the Questors' game of renown, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
