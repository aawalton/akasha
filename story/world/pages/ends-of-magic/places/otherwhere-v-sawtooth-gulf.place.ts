import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSawtoothGulf = {
  id: "01a0e9fb-8e1b-737f-b1f2-a67e102f6b0a",
  type: "page-type/place",
  slug: "otherwhere-v-sawtooth-gulf",
  title: "The Sawtooth Gulf",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-oceans",
  facts: [
    {
      fact: "The Sawtooth Gulf is a gulf of the sea where the eclipsemaw Othryx lurks below.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
