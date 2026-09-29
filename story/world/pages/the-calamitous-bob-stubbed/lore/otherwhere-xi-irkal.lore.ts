import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiIrkal = {
  id: "01a0ea87-2a4e-7256-8584-9fa6ac8b0bd7",
  type: "page-type/lore",
  slug: "otherwhere-xi-irkal",
  title: "Irkal",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-irkal",
  facts: [
    {
      fact: "Irkal was a son of Efestar in the ancient days when Efestar was a mortal assassin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Irkal and his brother Caeno were burned to death, and Emeric's band swore to avenge them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Irkal died before the old gods fell, ages ago; Irkal is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
