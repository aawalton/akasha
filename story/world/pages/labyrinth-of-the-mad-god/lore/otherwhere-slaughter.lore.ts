import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereSlaughter = {
  id: "01a0e9c6-337f-7c84-9bf4-848c674d6840",
  type: "page-type/lore",
  slug: "otherwhere-slaughter",
  title: "Slaughter, the Red Lady",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Slaughter rules a quadrant of sectors given over to carnage.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
