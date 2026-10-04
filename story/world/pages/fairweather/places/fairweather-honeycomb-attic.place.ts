import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherHoneycombAttic = {
  id: "01a1071e-1731-775f-b297-45d3bf4a82ba",
  type: "page-type/place",
  slug: "fairweather-honeycomb-attic",
  title: "The Honeycomb Attic",
  cover: "image/image-bfcce933d8b9acf1",
  world: "world/fairweather",
  within: "place/fairweather-honeycomb",
  facts: [
    {
      fact: "The Honeycomb's attic is one narrow room with a sloped ceiling and a round window over the canal.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "The attic room rents for one lantern a week, and smells of bread every morning from four.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "Narrow stairs lead down from the attic into the bakery.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "The attic holds a narrow bed, a rocking little table, a stool, a shelf, a basin and a chipped jug.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "Elsie's plants live in their crate under the attic's round window.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "A small framed mirror hangs awkwardly on the sloped wall over the bed, Elsie's only mirror.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
  ],
} as const satisfies Place
