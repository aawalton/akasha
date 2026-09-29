import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiThreeRivers = {
  id: "01a0ea88-4595-7463-8ec9-1693c67b6253",
  type: "page-type/place",
  slug: "otherwhere-xi-three-rivers",
  title: "Three Rivers",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Three Rivers is a royal capital of Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enoria's heirs are formally named at Three Rivers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Prince Gil was proclaimed heir of Enoria at Three Rivers after his rescue from Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
