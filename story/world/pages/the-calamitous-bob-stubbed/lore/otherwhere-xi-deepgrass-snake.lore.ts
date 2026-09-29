import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDeepgrassSnake = {
  id: "01a0ea84-e791-7d4f-b67e-5387106f238b",
  type: "page-type/lore",
  slug: "otherwhere-xi-deepgrass-snake",
  title: "Deepgrass Snake",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-deepgrass-snake",
  facts: [
    {
      fact: "Deepgrass snakes live on the kark steppes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Deepgrass snakes hide in steppe grass that grows up to two men tall.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
