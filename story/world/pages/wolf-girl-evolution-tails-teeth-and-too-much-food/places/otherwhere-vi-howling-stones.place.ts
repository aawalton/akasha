import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViHowlingStones = {
  id: "01a0ea32-6dbf-7673-9249-8204acb21c59",
  type: "page-type/place",
  slug: "otherwhere-vi-howling-stones",
  title: "The Howling Stones",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  within: "place/otherwhere-vi-greypine-weald",
  facts: [
    {
      fact: "The Howling Stones are a granite ridge half a day's walk north of Moss Hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shadow wolf pack dens in a cave-mouth under the ridge's tallest stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pack is some fourteen wolves, all Tier 0, with five pups of the spring litter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The alpha is a big grey male with a torn left ear, level 9, careful and proud.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An old she-wolf, grey at the muzzle, can speak a few terse words of the common tongue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pack hunts deer and boar on the ridges and does not hunt people unless starving or crossed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stranger near the den is warned off by growls and shadows; one who stays is attacked.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pack howls every clear night, and all together at the full moon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Earthen Bear on the east slopes has killed two of the pack this autumn.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
