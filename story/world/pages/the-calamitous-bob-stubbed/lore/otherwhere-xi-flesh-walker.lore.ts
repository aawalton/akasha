import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiFleshWalker = {
  id: "01a0ea7e-e8cf-76e2-adf9-b34c39eae8d8",
  type: "page-type/lore",
  slug: "otherwhere-xi-flesh-walker",
  title: "Flesh Walker",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-flesh-walker",
  facts: [
    {
      fact: "Flesh walkers are lumbering masses of flesh with pits for mouths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flesh walkers regenerate their wounds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flesh walkers smell of rot mixed with flowers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flesh walkers feed on the cursed fruit of flesh trees, meat grown in the shape of trees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flesh trees absorb those who attack them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flesh trees and walkers are the work of the dark god Gomogog, the Eater.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Purifying light turns regenerating flesh into charred glass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flesh trees and walkers plagued Sardanal's Cradle during its long siege.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
