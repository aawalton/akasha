import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersHollowbeast = {
  id: "01a0de54-1c11-74c1-ac19-454a00d39206",
  type: "page-type/lore",
  slug: "partners-hollowbeast",
  title: "Hollowbeast",
  world: "world/personas",
  about: "character-other/partners-hollowbeast",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "A hollowbeast is the Sundering's scar given a body.",
    "A hollowbeast is a living thing severed from the web of bonds.",
    "One hollowbeast is manageable at low level, and a pack is far worse.",
  ],
} as const satisfies Lore
