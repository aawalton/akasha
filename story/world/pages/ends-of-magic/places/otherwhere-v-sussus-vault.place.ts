import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSussusVault = {
  id: "01a0e9f7-65b7-7c8d-8c4c-5b8e269e868e",
  type: "page-type/place",
  slug: "otherwhere-v-sussus-vault",
  title: "Sussu's Vault",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-esebus-central-tower",
  facts: [
    {
      fact: "Sussu's vault lies beneath the central tower of Esebus, near the city's center.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The vault holds artifacts and Questor treasures hoarded since Davrar's first years.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
