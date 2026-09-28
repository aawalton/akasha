import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiBeyondTheStormWall = {
  id: "01a0ea41-4b62-7b2e-9fb4-9d5256f35f83",
  type: "page-type/place",
  slug: "otherwhere-vii-beyond-the-storm-wall",
  title: "Beyond the storm wall",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "Three days' flight over the eastern sea stands a wall of storm too high to fly over.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "There is no trade across the storm wall, and most think nothing lies beyond it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
