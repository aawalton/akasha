import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKel = {
  id: "01a0ea8c-81fc-79e5-bba4-07a66ffa02e1",
  type: "page-type/lore",
  slug: "otherwhere-xi-kel",
  title: "Kel",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kel",
  facts: [
    {
      fact: "Kel is a war mage of Luten, of the cadres that feed power to an archmage's grand spells.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kel fought Viv at Luten's Border Fortress and was taken, then freed in the prisoner exchange.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kel is thought to be in Luten this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
