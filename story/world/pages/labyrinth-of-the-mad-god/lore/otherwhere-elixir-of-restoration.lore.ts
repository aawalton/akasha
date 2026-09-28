import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereElixirOfRestoration = {
  id: "01a0e9d1-a3d9-71d9-bc0f-9b279ce44edf",
  type: "page-type/lore",
  slug: "otherwhere-elixir-of-restoration",
  title: "The Elixir of Restoration",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A flask of restoration is a Rare, soulbound vessel that refills with elixir every day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its elixir tastes of mango and basil and restores a quarter of health, stamina and mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It closes wounds, eases fatigue and gives others only half its effect on its owner.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
