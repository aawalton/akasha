import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiZora = {
  id: "01a0e9cf-bd37-704e-9e18-a7955b96ec55",
  type: "page-type/lore",
  slug: "otherwhere-ii-zora",
  title: "Zora the Death of Dreams",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Zora the Death of Dreams is the moth monarch of the Misty Expanse.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
