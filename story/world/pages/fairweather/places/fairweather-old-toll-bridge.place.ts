import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherOldTollBridge = {
  id: "01a1110d-5d39-7628-b6e9-34c7b55ab432",
  type: "page-type/place",
  slug: "fairweather-old-toll-bridge",
  title: "The Old Toll Bridge",
  cover: "image/image-1112c591888c0b44",
  world: "world/fairweather",
  facts: [
    {
      fact: "The old toll bridge is a humped stone bridge on the River Wend, a morning's walk north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Two river trolls live under the old toll bridge and take sheep from Wend Meadows by night.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "A river troll is twice a woman's height, mossy and slow, and sleeps by day under the arch.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-tamsin"],
    },
    {
      fact: "The shepherds of Wend Meadows pay the E-rank troll notice: twelve lanterns.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
