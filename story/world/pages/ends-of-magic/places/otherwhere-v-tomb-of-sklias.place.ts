import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVTombOfSklias = {
  id: "01a0e9f4-7b7f-703f-894d-b024045caae9",
  type: "page-type/place",
  slug: "otherwhere-v-tomb-of-sklias",
  title: "The Tomb of Sklias",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest-continent",
  facts: [
    {
      fact: "The tomb of Sklias is a dungeon outside Gemore, full of undead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tomb has the serpentine architecture of the old Sklias Dominion's dungeons.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
