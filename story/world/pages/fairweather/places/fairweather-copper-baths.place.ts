import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherCopperBaths = {
  id: "01a10791-f599-7c59-b8d3-1e3b8ffe6227",
  type: "page-type/place",
  slug: "fairweather-copper-baths",
  title: "The Copper Baths",
  cover: "image/image-d6638488ba297167",
  world: "world/fairweather",
  within: "place/fairweather-lanternmere",
  facts: [
    {
      fact: "The Copper Baths are the city's public bathhouse, under a green copper dome by the lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Copper Baths have a great warm pool, steam rooms and cold plunges, and cost one pip.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Copper Baths keep women's days and men's days, and the ninth is a women's day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cistern under the Copper Baths feeds the pools, reached by an iron ladder from the boiler room.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mere eels as long as a woman get into the Baths' cistern and foul the pipes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Mere eel bites hard and holds, but is slow on land and dies in hot water.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
