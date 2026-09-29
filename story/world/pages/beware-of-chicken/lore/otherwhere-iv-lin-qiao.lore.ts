import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvLinQiao = {
  id: "01a0eaab-f292-7e0b-90a4-2ee9b823d49d",
  type: "page-type/lore",
  slug: "otherwhere-iv-lin-qiao",
  title: "Lin Qiao",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Lin Qiao keeps the stall under the camphor, and offered Nala warm steamed buns.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
    {
      fact: "Lin Qiao has a small boy, who stared open-mouthed at Nala's hair.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
  ],
} as const satisfies Lore
