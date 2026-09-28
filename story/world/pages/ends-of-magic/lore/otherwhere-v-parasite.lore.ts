import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVParasite = {
  id: "01a0e9fd-5acf-766f-8317-56cd53ad452a",
  type: "page-type/lore",
  slug: "otherwhere-v-parasite",
  title: "Parasite",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-parasite",
  facts: [
    {
      fact: "Parasites are a known threat on Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gemore's gate checks everyone entering for parasites, cursed items and mental effects.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
