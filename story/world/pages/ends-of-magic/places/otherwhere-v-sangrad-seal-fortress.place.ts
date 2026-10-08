import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSangradSealFortress = {
  id: "01a0e9fb-fe35-7545-a402-3aa95606b73c",
  type: "page-type/place",
  slug: "otherwhere-v-sangrad-seal-fortress",
  title: "The Seal Fortress of Sangrad",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-sangrad",
  facts: [
    {
      fact: "The Seal Fortress guards Sangrad's Seal and rises through the cavern to an opening in its roof.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:46:41.077Z",
  updatedAt: "2026-09-28T21:46:44.000Z",
} as const satisfies Place
