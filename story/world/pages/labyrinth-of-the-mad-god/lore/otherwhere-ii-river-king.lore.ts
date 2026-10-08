import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiRiverKing = {
  id: "01a0e9c1-484c-78a5-a2e2-fc6a94cc1a2a",
  type: "page-type/lore",
  slug: "otherwhere-ii-river-king",
  title: "The River King",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The River King is a giant dragon turtle, the apex beast of Blackmist Bog.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It breathes a cone of fire, and its bite tears limbs from fighters who get close.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It prowls the bog's rivers near the base of the tower.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T20:42:33.420Z",
  updatedAt: "2026-09-28T22:36:35.000Z",
} as const satisfies Lore
