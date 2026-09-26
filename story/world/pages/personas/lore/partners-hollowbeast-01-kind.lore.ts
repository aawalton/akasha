import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersHollowbeast01Kind = {
  id: "01a0de84-4891-7eb1-80e8-213ab3072af1",
  type: "page-type/lore",
  slug: "partners-hollowbeast-01-kind",
  title: "The Gray-Eyed Thing's kind",
  world: "world/personas",
  about: "character-other/partners-hollowbeast-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Gray-Eyed Thing was a hollowbeast of the first danger, one alone and of the lowest level.",
    "Every hollowbeast is built as the Gray-Eyed Thing was, and a pack is more of them at higher levels.",
    "The Choir can drive a hollowbeast to sever a bond and lure its prey through the break.",
    "Killing the Gray-Eyed Thing read as mercy.",
  ],
} as const satisfies Lore
