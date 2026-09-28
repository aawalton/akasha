import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVOldGemore = {
  id: "01a0e9f4-06cc-7fbf-af12-bff1a59e2e03",
  type: "page-type/place",
  slug: "otherwhere-v-old-gemore",
  title: "Old Gemore",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest-continent",
  facts: [
    {
      fact: "Old Gemore is a vast ancient ruined city, full of dungeons, artifacts and treasures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The living city of Gemore sits on a mountain at the heart of Old Gemore's ruins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giantsrest once held Gemore as an outpost where slaves cleared Old Gemore's dungeons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giantsrest's slaves looted many artifacts from Old Gemore's ruins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old Gemore has ancient spatially compressed transit roads that shorten long trips.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
