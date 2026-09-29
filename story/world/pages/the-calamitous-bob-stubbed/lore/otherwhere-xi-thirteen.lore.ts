import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiThirteen = {
  id: "01a0ea7e-3c79-7ee6-8931-fb3f31a91a49",
  type: "page-type/lore",
  slug: "otherwhere-xi-thirteen",
  title: "Thirteen",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-thirteen",
  facts: [
    {
      fact: "Thirteen is the oldest hadal woman, a spy and bodyguard of New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thirteen has long gray hair and bandaged fingers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thirteen and Two-Six butchered Helock's council after it welcomed Oleander.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thirteen served as a bodyguard in the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Thirteen serves with Irao's hadals in New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
