import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVEnsby = {
  id: "01a0e9f7-65b6-78bf-afe5-c566225aee49",
  type: "page-type/place",
  slug: "otherwhere-v-ensby",
  title: "Ensby",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-esebus-continent",
  facts: [
    {
      fact: "Ensby is a place northeast of the city of Esebus.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
