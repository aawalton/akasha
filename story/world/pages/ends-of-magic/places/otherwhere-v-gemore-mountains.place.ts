import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGemoreMountains = {
  id: "01a0e9f3-cc55-70b0-bbe4-8f0f61fe6b92",
  type: "page-type/place",
  slug: "otherwhere-v-gemore-mountains",
  title: "The Mountains between Gemore and Giantsrest",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest-continent",
  facts: [
    {
      fact: "A mountain range separates Gemore from Giantsrest; Halsmet guards the way through.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mountains run north of the route from Giantsrest to Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The range is dotted with Quaz crypts and Kalis conclave tower dungeons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mountains north of Gemore hold terrible dungeons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Disturbing a Quaz crypt in these mountains can spawn a grave tangle.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
