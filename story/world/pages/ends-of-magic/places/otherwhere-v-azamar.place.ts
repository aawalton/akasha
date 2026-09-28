import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVAzamar = {
  id: "01a0e9f4-f9b3-7303-a62e-1eedfdc212a9",
  type: "page-type/place",
  slug: "otherwhere-v-azamar",
  title: "Azamar",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "Azamar is a town somewhere beyond Gemore's region.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
