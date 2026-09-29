import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLeni = {
  id: "01a0ea91-710e-79c0-b6a3-31349601fc94",
  type: "page-type/lore",
  slug: "otherwhere-xi-leni",
  title: "Goodmother Leni",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-leni",
  facts: [
    {
      fact: "Goodmother Leni is a commoner woman Viv met on her road across Enoria to Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leni is thought to be at home in Enoria this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
