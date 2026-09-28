import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVMonasteryOfQuaz = {
  id: "01a0e9f4-f9b3-7f4b-b9f3-d6f7b08bf149",
  type: "page-type/place",
  slug: "otherwhere-v-monastery-of-quaz",
  title: "The Monastery of Quaz",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "A monastery of Quaz lies in the mountains, haunted by undead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
