import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereSarah = {
  id: "01a0e9ca-c7c4-7f57-84aa-fc7cee9a505e",
  type: "page-type/lore",
  slug: "otherwhere-sarah",
  title: "Sarah",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Sarah is a human contestant of Earth who works with light and illusion.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
