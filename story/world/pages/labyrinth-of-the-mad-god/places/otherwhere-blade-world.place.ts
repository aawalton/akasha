import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereBladeWorld = {
  id: "01a0e9bf-c1f3-7db7-8c34-c97882f6bc5c",
  type: "page-type/place",
  slug: "otherwhere-blade-world",
  title: "The Blade World",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Blade World is an inner world inside a Legendary sword forged by the Kastillans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its bearer may visit for half an hour a day while only seconds go by outside.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It mirrors lost Kastilla: a dirt road, a farmhouse, alien cattle and turning seasons.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
