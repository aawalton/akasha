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
  createdAt: "2026-09-28T20:47:01.512Z",
  updatedAt: "2026-09-28T22:33:51.000Z",
} as const satisfies Lore
