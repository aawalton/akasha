import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiWesternLand = {
  id: "01a0ea77-3d68-7331-a57b-9102f17309c2",
  type: "page-type/place",
  slug: "otherwhere-xi-western-land",
  title: "The Land Beyond the Endless Sea",
  world: "world/the-calamitous-bob-stubbed",
  facts: [
    {
      fact: "Some believe a land lies west of Param, beyond the Endless Sea; no one has reached it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The land beyond the Endless Sea appears on no Paramese chart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nyil is held to have three continents; Param and Vizim are two of them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
