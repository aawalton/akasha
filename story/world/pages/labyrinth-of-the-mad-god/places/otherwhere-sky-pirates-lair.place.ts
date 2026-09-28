import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereSkyPiratesLair = {
  id: "01a0e9ba-dd9e-7fc1-84bb-47b5eef8f730",
  type: "page-type/place",
  slug: "otherwhere-sky-pirates-lair",
  title: "Sky-Pirates' Lair",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-tower-of-rizzen",
  facts: [
    {
      fact: "The Sky-Pirates' Lair is a hollow level the size of a small country and miles high.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A quarter of its outer wall opens onto the sky above a planet far below.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hundreds of floating islands drift at fixed heights, each a sealed biome.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its islands include prairie, purple rainforest, badlands, desert and misty isles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Storms blow in through the open side with rain, wind and thunder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ground holds a forest of donkey-sized pack raptors that eat their own wounded.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The stairs out sit on the highest island, a prairie just below the ceiling.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
