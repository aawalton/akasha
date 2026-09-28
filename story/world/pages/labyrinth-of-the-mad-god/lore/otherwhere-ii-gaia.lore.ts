import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiGaia = {
  id: "01a0e9c7-1b29-7aef-96a1-10fe78cae4d7",
  type: "page-type/lore",
  slug: "otherwhere-ii-gaia",
  title: "Gaia, Voice of the Earth",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Gaia is the Voice of the Earth, the spirit within Earth's world core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She calls herself the Mother and the One Who Is Many, cradle, grave and home.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
