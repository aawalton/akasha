import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMin = {
  id: "01a0ea80-4334-7da5-8d57-7435dbfc43bd",
  type: "page-type/lore",
  slug: "otherwhere-xi-min",
  title: "Min",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-min",
  facts: [
    {
      fact: "Min is an old archmage of Luten, more than a hundred years old.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Min led the Lutenese mage cadres who fed power to a single archmage's grand spells.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Min surrendered to Viv when she stormed Luten's Border Fortress.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Min is back in Luten, traded home under Baran's treaty.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
