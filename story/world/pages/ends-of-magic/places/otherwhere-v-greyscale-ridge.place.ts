import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGreyscaleRidge = {
  id: "01a0e9fb-d4a0-73e3-8fbf-517facdaaba4",
  type: "page-type/place",
  slug: "otherwhere-v-greyscale-ridge",
  title: "Greyscale Ridge",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-greyscale-wood",
  exits: [
    {
      to: "place/otherwhere-v-fern-hollow",
      way: "Down the steep, root-stepped slope a quarter mile to the hollow; ten minutes.",
      direction: "south",
    },
    {
      to: "place/otherwhere-v-greyscale-wood",
      way: "North along the ridgeline through scalebark toward Thornmouth; two days on foot.",
      direction: "north",
    },
  ],
  facts: [
    {
      fact: "Greyscale Ridge is a spine of grey rock and scalebark a quarter mile above Fern Hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The climb from the hollow to the ridge is steep, with roots for steps; about fifteen minutes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A bald outcrop on the crest looks south over the treetops across the whole Serrin Vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the outcrop the Serrin glints six miles south-west, and Serrinford's smoke rises by it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the outcrop, a pale scar of felled trees marks the logging camp to the south-east.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The gloamcat's den is a cleft under a split boulder just below the outcrop's east face.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gnawed deer bones and grey fur lie scattered at the den's mouth, and it smells of musk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The gloamcat sleeps in the den by day and leaves it at dusk to hunt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ridge is windy and colder than the hollow, and dry: it has no water.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
