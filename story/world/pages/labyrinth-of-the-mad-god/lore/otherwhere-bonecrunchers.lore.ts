import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereBonecrunchers = {
  id: "01a0e9c0-87b2-7dea-b149-93bd925ccbff",
  type: "page-type/lore",
  slug: "otherwhere-bonecrunchers",
  title: "Bonecrunchers",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Bonecrunchers are oversized hyenas that hunt the Searing Isle as a pack.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They have keen ears, and staying quiet and hidden is the best defense against them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An abandoned cruncher den makes a defensible shelter.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
