import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVBlightCity = {
  id: "01a0e9f8-5ddc-7efb-be05-2a3d78048c7d",
  type: "page-type/place",
  slug: "otherwhere-v-blight-city",
  title: "The Ruined City of the Blight",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-the-blight",
  facts: [
    {
      fact: "An ancient ruined city, rivalling Old Gemore in size, lies ringed by hills at the Blight's heart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From outside, the city seems a peaceful place of belltowers, spires and forest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A huge coliseum dug into the ground sits at the city's center.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
