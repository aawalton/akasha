import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvThreeStonesVillage = {
  id: "01a0e9f3-b01f-7997-bd75-259381d6ef35",
  type: "page-type/place",
  slug: "otherwhere-iv-three-stones-village",
  title: "Three Stones Village",
  world: "world/beware-of-chicken",
  exits: [
    {
      to: "place/otherwhere-iv-ox-back-ridge",
      way: "The market road out of the village, climbing over Ox-Back Ridge toward Lanqiao.",
    },
  ],
  facts: [
    {
      fact: "Three Stones is a mortal farming village of some forty households, five li below the bend.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The cart track from Willow Bend follows the river's left bank down into the village.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The way down from the bend takes most of an hour on foot, past terrace after terrace.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "By early morning farmers in straw hats work knee-deep in the paddies, weeding.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Water buffalo graze on the field banks, and white egrets stalk the flooded terraces.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rice was transplanted this month, and families now weed and mind the water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Three tall grey upright stones ring a small earth-god shrine at the village's heart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Houses are rammed earth under grey tile or thatch, each with a walled yard and plot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The villagers also keep ducks, grow mulberry for silkworms, and pick tea on the slopes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rice, spring cocoons and tea go to market by cart; salt, iron and cloth come back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A tea-and-noodle stall sits where the track enters the village, under a big camphor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The headman's house, the only one with a tiled gate, faces the shrine square.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dogs bark at strangers, and children run to stare at anyone new.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Folk are wary of strangers but keep courtesy toward a guest who keeps it too.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No cultivator lives here, and villagers bow low and keep clear of any who come by.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nobody in the village has seen red hair before.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The market town of Lanqiao lies thirty li downstream, with a market every fifth day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The woods above the bend are feared this spring: something big breaks paddy walls at night.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
