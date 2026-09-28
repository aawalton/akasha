import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSoulEater = {
  id: "01a0e9fd-5ad0-78e3-b46e-bc2a615fe8ff",
  type: "page-type/lore",
  slug: "otherwhere-v-soul-eater",
  title: "Soul Eater",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-soul-eater",
  facts: [
    {
      fact: "Soul eaters are named among the evils that plague Davrar, alongside mind magic and blights.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
