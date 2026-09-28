import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVFirefacePass = {
  id: "01a0e9f3-cc54-7cf2-9233-c90c6a30f49f",
  type: "page-type/place",
  slug: "otherwhere-v-fireface-pass",
  title: "Fireface Pass",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-gemore-mountains",
  facts: [
    {
      fact: "Fireface Pass is a mountain pass that holds a dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
