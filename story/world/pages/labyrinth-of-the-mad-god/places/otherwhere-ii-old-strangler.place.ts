import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiOldStrangler = {
  id: "01a0e98e-a9b8-7fd2-a6e1-075142639c90",
  type: "page-type/place",
  slug: "otherwhere-ii-old-strangler",
  title: "The Old Strangler",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-lowland-wood",
  facts: [
    {
      fact: "The Old Strangler is a giant fig whose roots long ago choked and rotted out its host tree.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It sits beside the game trail about a mile into the Lowland Wood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its lattice of roots walls a dry hollow inside, big enough for two people to lie down.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hollow has one gap wide enough for a small person to squeeze through.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hollow stays dry in rain and is too narrow for a mire monitor or the ashback.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its high branches give a view over the canopy to the mountain and the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
