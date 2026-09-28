import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVAgmon = {
  id: "01a0e9f4-f9b2-7837-b29b-afb85b547847",
  type: "page-type/place",
  slug: "otherwhere-v-agmon",
  title: "Agmon",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest-continent",
  facts: [
    {
      fact: "Agmon is the land of an orcish empire in the far west of the continent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agmon lies across the sea of grass from Gemore's region.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agmon lies at the far end of the continent from Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
