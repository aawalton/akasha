import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSan = {
  id: "01a0ea87-7eb4-7ece-a752-8d44a1a1bbbf",
  type: "page-type/lore",
  slug: "otherwhere-xi-san",
  title: "San",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-san",
  facts: [
    {
      fact: "San is a war mage of Luten who served with the archmage Min and the mage Kel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "San fought Viv at Luten's Border Fortress in the Red Tribe's war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season San is in the lands of the Pure League of Luten.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
