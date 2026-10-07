import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherHoneycomb = {
  id: "01a102af-305c-7b0a-9506-c7b829b856a9",
  type: "page-type/place",
  slug: "fairweather-honeycomb",
  title: "The Honeycomb",
  cover: "image/image-87a2bdfe9eed8272",
  world: "world/fairweather",
  within: "place/fairweather-lanternmere",
  facts: [
    {
      fact: "The Honeycomb is a bakery on Thimble Canal, kept by a small, round-faced widow in her sixties.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "The baker lets her lodger use the ovens after closing, for the cost of the firewood.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "The Honeycomb's baker is the widow Agnes Merriweather, and says little but notices everything.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "Agnes Merriweather's honey cake is known all along Thimble Canal, and she has never written it down.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-rosa",
      ],
    },
    {
      fact: "Her honey cake takes a whole comb of honey, and must rest a night under a cloth before it is cut.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "The Honeycomb's baker taught Elsie her honey cake, the first she has taught it in forty years.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-rosa",
      ],
    },
    {
      fact: "Agnes Merriweather made the honey cake for Rosa Reyes's wedding, thirty years ago.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-rosa",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-nell",
      ],
    },
    {
      fact: "Agnes Merriweather corrected Elsie's honey cake recipe: a moderate oven, not a hot one.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "Agnes taught Elsie to brush her honey cakes with the last of the comb for a crust.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-noor",
      ],
    },
    {
      fact: "The Honeycomb shuts at noon on Midsummer, the same every year.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "Mrs Merriweather lent Elsie a round bee tin for the boat's honey cakes, to bring back.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "Mrs Merriweather gave Elsie the bee tin to keep, for the honey cakes.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
    {
      fact: "Mrs Merriweather offered Elsie her oven on Sundays, cool by four, to bake.",
      knowers: ["lore-disclosure/game-master", "character-player/fairweather-elsie"],
    },
  ],
} as const satisfies Place
