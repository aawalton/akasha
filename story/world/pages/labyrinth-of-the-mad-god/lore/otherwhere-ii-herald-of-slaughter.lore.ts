import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiHeraldOfSlaughter = {
  id: "01a0e9c5-5f88-7c2c-9d09-d851585521ff",
  type: "page-type/lore",
  slug: "otherwhere-ii-herald-of-slaughter",
  title: "The Herald of Slaughter",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Herald of Slaughter appears at arena fights to corrupt beasts for the show.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
