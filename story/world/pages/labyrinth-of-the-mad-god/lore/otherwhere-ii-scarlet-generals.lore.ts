import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiScarletGenerals = {
  id: "01a0e9d0-bfd7-7c8e-b6e8-adeee5f519b6",
  type: "page-type/lore",
  slug: "otherwhere-ii-scarlet-generals",
  title: "Generals of the Scarlet Legion",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Scarlet Legion's commanders are feared across the domains.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
