import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVUnderworld = {
  id: "01a0e9fb-fe36-7708-a45a-991d8504674e",
  type: "page-type/place",
  slug: "otherwhere-v-underworld",
  title: "The Underworld",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "The underworld lies beneath Davrar's surface: monsters, magic, dungeons and wild ecosystems.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only true powers dare walk the underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The oceans drain down into the underworld through vortices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The cavern-city of Sangrad lies in the underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Braving the underworld is counted among the great deeds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
