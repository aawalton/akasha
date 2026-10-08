import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiVashir = {
  id: "01a0e9cf-bd36-7a2c-82c9-daa8d851f2a4",
  type: "page-type/lore",
  slug: "otherwhere-ii-vashir",
  title: "Black-Wind Vashir",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Black-Wind Vashir is the bat monarch of the Cratered Lands.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:58:20.854Z",
  updatedAt: "2026-09-28T22:38:17.000Z",
} as const satisfies Lore
