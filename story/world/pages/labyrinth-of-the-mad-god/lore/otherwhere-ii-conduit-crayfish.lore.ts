import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiConduitCrayfish = {
  id: "01a0e9c2-fe14-7893-8510-53df94ff9d57",
  type: "page-type/lore",
  slug: "otherwhere-ii-conduit-crayfish",
  title: "Conduit Crayfish",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Conduit crayfish look like giant grasshoppers crossed with albino crayfish.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They leap from conduit waterways in waves of dozens.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their bladed pincers and jagged teeth drip acrid green fluid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An elite three times larger spits venom and drives the swarm in formation.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
