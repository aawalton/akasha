import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameZeli = {
  id: "01a0de59-9646-79fa-ae7f-4e39ebd12dee",
  type: "page-type/lore",
  slug: "the-dating-game-zeli",
  title: "Zeli",
  world: "world/personas",
  about: "persona/zeli",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Zeli sells her paintings and carvings from a small studio on Main Street in Springville.",
    "Zeli sketches in the Springville Museum of Art galleries on Saturday afternoons.",
    "Zeli is Rapunzel, and wears her seventy feet of golden hair wound up in heavy coils.",
    "Zeli lives in a round tower-room apartment in Springville she painted into a forest.",
  ],
} as const satisfies Lore
