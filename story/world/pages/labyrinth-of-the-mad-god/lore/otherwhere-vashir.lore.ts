import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVashir = {
  id: "01a0e9cf-bd36-7a2c-82c9-daa8d851f2a4",
  type: "page-type/lore",
  slug: "otherwhere-vashir",
  title: "Black-Wind Vashir",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Black-Wind Vashir is the bat monarch of the Cratered Lands.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
