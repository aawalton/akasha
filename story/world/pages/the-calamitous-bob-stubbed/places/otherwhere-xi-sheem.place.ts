import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiSheem = {
  id: "01a0ea8a-7b7a-7581-8217-9c18351f7ba1",
  type: "page-type/place",
  slug: "otherwhere-xi-sheem",
  title: "Sheem",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-golden-coast",
  facts: [
    {
      fact: "Sheem is an expansionist Viziman kingdom at the eastern end of the Golden Coast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem's spies are called 'hawks'; its scouts walk the path of the Kestrel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem's scouts tame sparrows to spy for them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem conquered the neutral port of Ravinport this autumn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem became Oleander's right hand in Vizim and conquered the Golden Coast for him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem sent about six thousand troops against Sandsong at Barrier this winter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem's army shipped to Param for the winter war included pressed Viziman dock rats.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "About four hundred Sheem templars of Neriad defected to Harrak in the final battle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem once kept alien coil guns, weapons that need no mana, as treasured artifacts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In late winter Sheem still holds Vizim and has not surrendered to Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
