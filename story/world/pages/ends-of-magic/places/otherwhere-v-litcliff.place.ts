import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVLitcliff = {
  id: "01a0e9f4-f9b3-774d-93ff-960126228f9e",
  type: "page-type/place",
  slug: "otherwhere-v-litcliff",
  title: "Litcliff",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest-continent",
  facts: [
    {
      fact: "Litcliff is a port city on the continent's southern coast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Litcliff is a grungy port on a harsh coast battered by giant waves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An ancient artifact calms the waves at Litcliff so ships can come and go.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ships from Litcliff are the continent's sea route to other lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Litcliff's rulers keep a palace in the city.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
