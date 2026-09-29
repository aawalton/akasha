import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSil = {
  id: "01a0ea86-00cd-7d72-8e8a-d4796f8373e3",
  type: "page-type/lore",
  slug: "otherwhere-xi-sil",
  title: "Sil",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sil",
  facts: [
    {
      fact: "Captain Sil commanded the arcane ship Emeric's Girl, which bore Viv to Sardanal's Cradle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sil is dead, killed by a sniper spider as the ship reached the Cradle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sil's taciturn father took command of Emeric's Girl after him.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
