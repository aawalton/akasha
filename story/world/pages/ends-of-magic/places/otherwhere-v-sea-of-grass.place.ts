import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSeaOfGrass = {
  id: "01a0e9f4-f9b3-7e59-b62d-0dffa21605e0",
  type: "page-type/place",
  slug: "otherwhere-v-sea-of-grass",
  title: "The Sea of Grass",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest-continent",
  facts: [
    {
      fact: "The sea of grass is a wide grassland between Gemore's region and the empire of Agmon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Treeborn tribes live in the lands between Gemore and Agmon.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:39:01.171Z",
  updatedAt: "2026-09-28T21:39:05.000Z",
} as const satisfies Place
