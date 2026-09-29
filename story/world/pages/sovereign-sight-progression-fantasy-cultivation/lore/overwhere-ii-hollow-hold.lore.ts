import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiHollowHold = {
  id: "01a0ed30-ad4d-7832-a6d9-1db342010935",
  type: "page-type/lore",
  slug: "overwhere-ii-hollow-hold",
  title: "The Hollow Hold",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "The Hollow Hold is a noble preparatory school that readies elite children for the Nine Spires.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hollow Hold is run by governesses.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The heiress Mae Mallova studied at the Hollow Hold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mae Mallova tried to take another girl's axe there, and got two black eyes for it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
