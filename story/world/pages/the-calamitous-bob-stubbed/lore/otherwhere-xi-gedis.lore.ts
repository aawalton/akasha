import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGedis = {
  id: "01a0ea85-3eae-732d-b620-f6d610aa132d",
  type: "page-type/lore",
  slug: "otherwhere-xi-gedis",
  title: "Gedis",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-gedis",
  facts: [
    {
      fact: "Gedis is the grandson and heir of old Ediar, the one-armed lord of Reixa in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gedis is thought to be at Reixa with his grandfather this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
