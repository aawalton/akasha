import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiWalkingTree = {
  id: "01a0ea83-059f-7fb7-93d1-c2ba7332ba42",
  type: "page-type/lore",
  slug: "otherwhere-xi-walking-tree",
  title: "Walking Tree",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-walking-tree",
  facts: [
    {
      fact: "Walking trees come out of the Deadshield Woods from time to time.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some fifty years ago walking trees wrecked half the town of Green Edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Deadshield legends also tell of man-eating plants, bears and giant turtles.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
