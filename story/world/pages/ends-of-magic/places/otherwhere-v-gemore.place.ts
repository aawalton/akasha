import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGemore = {
  id: "01a0e9f4-7b7f-7225-8963-e12162efe420",
  type: "page-type/place",
  slug: "otherwhere-v-gemore",
  title: "Gemore",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-old-gemore",
  facts: [
    {
      fact: "Gemore is a city founded by ex-slaves who revolted against Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gemore sits on a mountain amid Old Gemore's ruins; its council hall is at the peak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An old stone wall rings the base of Gemore's mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Gemore Seal lies inside the city's mountain and sustains the continent's magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gemore has mansions with gardens for its wealthier families.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Halsmet and then Giantsrest lie across the mountains from Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The coast is several days from Gemore on foot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tomb of Sklias, full of undead, lies outside Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
