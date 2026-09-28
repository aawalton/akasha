import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereSplendor = {
  id: "01a0e9c6-337f-713d-8cc1-c37957e5f731",
  type: "page-type/lore",
  slug: "otherwhere-splendor",
  title: "Splendor",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Splendor, also called Greed, lures people to their doom through desire for treasure.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
