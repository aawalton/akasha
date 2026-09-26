import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersHollowbeast = {
  id: "01a0de54-1c11-74c1-ac19-454a00d39206",
  type: "page-type/lore",
  slug: "partners-hollowbeast",
  title: "Hollowbeast",
  world: "world/personas",
  about: "character-other/partners-hollowbeast",
  facts: [
    {
      fact: "A hollowbeast is the Sundering's scar given a body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A hollowbeast is a living thing severed from the web of bonds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One hollowbeast is manageable at low level, and a pack is far worse.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
