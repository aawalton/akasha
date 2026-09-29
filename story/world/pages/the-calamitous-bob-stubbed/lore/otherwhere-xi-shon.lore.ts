import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiShon = {
  id: "01a0ea86-c326-720b-8127-c13b68d920ba",
  type: "page-type/lore",
  slug: "otherwhere-xi-shon",
  title: "Shon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-shon",
  facts: [
    {
      fact: "Shon was a young Dark Blade of Luten, the last of some fifty sent against the Red Tribe.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shon wielded the cursed Dark Blade, which eats the life of an unworthy wielder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv spared Shon to carry a message, with about two months left to live.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shon is believed long dead, his life eaten by the blade.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
