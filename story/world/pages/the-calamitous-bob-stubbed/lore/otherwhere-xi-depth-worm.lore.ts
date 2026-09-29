import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDepthWorm = {
  id: "01a0ea7e-5eaa-7ac2-ac60-a53f40bb6e54",
  type: "page-type/lore",
  slug: "otherwhere-xi-depth-worm",
  title: "Depth Worm",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-depth-worm",
  facts: [
    {
      fact: "A depth worm is a huge undead worm with no head, only a maw ringed with fangs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A depth worm spews out maggot-like hatchlings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A depth worm gives off a foul stench.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A depth worm leaves a white crust that corrodes all metal nearby to scraps.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A depth worm lurked in Sinur's Gate's old sewers until they were cleared.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrakans rate a depth worm a threat that needs a special team.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
