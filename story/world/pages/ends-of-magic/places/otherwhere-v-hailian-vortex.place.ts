import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVHailianVortex = {
  id: "01a0e9fb-8e1a-7df3-aaa5-a88091138fab",
  type: "page-type/place",
  slug: "otherwhere-v-hailian-vortex",
  title: "The Hailian Vortex",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-oceans",
  facts: [
    {
      fact: "The Hailian vortex is an ocean vortex on the sea road between Kankus and Helmaris.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A gap of open sea lies between the Hailian vortex and the nearest land.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
