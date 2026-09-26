import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiHollowbeast = {
  id: "01a0de51-2d5f-76f6-8fbe-759b95093c33",
  type: "page-type/lore",
  slug: "partners-ii-hollowbeast",
  title: "Hollowbeast",
  world: "world/personas",
  about: "character-other/partners-ii-hollowbeast",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "A hollowbeast is the Sundering's scar given a body.",
    "A hollowbeast is a living thing severed from the web of bonds.",
    "One hollowbeast is manageable at low level, and a pack is far worse.",
  ],
} as const satisfies Lore
