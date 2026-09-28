import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFey = {
  id: "01a0e9f4-fc81-750a-8142-745eb9ab1b78",
  type: "page-type/lore",
  slug: "otherwhere-v-fey",
  title: "Fey",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-fey",
  facts: [
    {
      fact: "The fey are known on Davrar mostly through tales and sayings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A sharp, uncanny old woman may be likened to a crone of the fey.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
