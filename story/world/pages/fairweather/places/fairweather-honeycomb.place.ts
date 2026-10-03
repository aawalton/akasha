import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherHoneycomb = {
  id: "01a102af-305c-7b0a-9506-c7b829b856a9",
  type: "page-type/place",
  slug: "fairweather-honeycomb",
  title: "The Honeycomb",
  world: "world/fairweather",
  within: "place/fairweather-lanternmere",
  facts: [
    {
      fact: "The Honeycomb is a bakery on Thimble Canal, kept by a small, round-faced widow in her sixties.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "The Honeycomb's attic is one narrow room with a sloped ceiling and a round window over the canal.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "The attic room rents for one lantern a week, and smells of bread every morning from four.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "The baker lets her lodger use the ovens after closing, for the cost of the firewood.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
  ],
} as const satisfies Place
