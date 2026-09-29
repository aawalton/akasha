import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTwoSix = {
  id: "01a0ea7e-3c79-7868-b938-981566dc3885",
  type: "page-type/lore",
  slug: "otherwhere-xi-two-six",
  title: "Two-Six",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-two-six",
  facts: [
    {
      fact: "Two-Six is a veteran hadal assassin of New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Two-Six and Thirteen butchered Helock's council after it welcomed Oleander.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Two-Six serves with Irao's hadals.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
