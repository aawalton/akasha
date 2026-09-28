import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHarpy = {
  id: "01a0e9f9-9dd7-7906-82ec-823825ec0b49",
  type: "page-type/lore",
  slug: "otherwhere-v-harpy",
  title: "Harpy",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-harpy",
  facts: [
    {
      fact: "Harpies are monsters known across Davrar, mostly through curses.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Harpy\'s tits" is a common curse of surprise or dismay.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
