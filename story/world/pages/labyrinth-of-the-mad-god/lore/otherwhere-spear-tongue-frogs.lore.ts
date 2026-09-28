import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereSpearTongueFrogs = {
  id: "01a0e9c1-484d-7192-84a2-90e0caa601fc",
  type: "page-type/lore",
  slug: "otherwhere-spear-tongue-frogs",
  title: "Spear-Tongue Frogs",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Spear-tongue frogs are big bog frogs with a black spike on the tip of a long pink tongue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tongue strikes like a battering ram, wraps prey and reels it in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their bones are black.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
