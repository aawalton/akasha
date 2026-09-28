import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVBlightColosseum = {
  id: "01a0e9f8-5ddc-7b6d-a4f1-a821439bf179",
  type: "page-type/place",
  slug: "otherwhere-v-blight-colosseum",
  title: "The Colosseum of the Blight",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-blight-city",
  facts: [
    {
      fact: "The colosseum is dug deep into the ground at the center of the Blight's ruined city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The colosseum's stone is reddish, and its sand is naturally dark red.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
