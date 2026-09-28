import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereCrimsonBeetles = {
  id: "01a0e9c3-c617-75f1-b31c-8075c5705eb8",
  type: "page-type/lore",
  slug: "otherwhere-crimson-beetles",
  title: "Crimson Beetles",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Crimson beetles have wagon-sized red abdomens and dozens of legs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A huge round head full of red teeth sits on a long prehensile neck.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They hunt in threes, silent and camouflaged, and their venom freezes flesh.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
