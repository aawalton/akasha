import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereGullrockHead = {
  id: "01a0e99b-64b0-7a2e-97bf-980ed0d9bdb3",
  type: "page-type/place",
  slug: "otherwhere-gullrock-head",
  title: "Gullrock Head",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-cinder-isle",
  facts: [
    {
      fact: "Gullrock Head is the black rock headland closing the Black Shore to the south.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies some four miles south of where Nala came to, past the Glassrun's mouth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gulls nest in thousands on its ledges; their eggs can be reached by a careful climber.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its rock is sharp, broken lava, cruel to bare feet and hands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tide pools at its foot hold crabs, snails and small fish.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
