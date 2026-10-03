import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const slowTread = {
  id: "01a0ddff-b8bd-7e2c-a24a-db3492f1e799",
  type: "page-type/lore",
  slug: "slow-tread",
  title: "Slow-Tread",
  world: "world/cornerstone",
  about: "world-character/cornerstone-slow-tread",
  facts: [
    {
      fact: "Slow-Tread is the old one of the founding camp, named by the core for its tread.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slow-Tread walks as though each step cost it and was worth the cost.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slow-Tread goes where the others do not: out along the rim.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slow-Tread walks the whole circuit of the core's edge, slowly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slow-Tread walks the rim as if counting the core, walking its bounds to learn its true size.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Slow-Tread grieves the camp's first dead.", knowers: ["lore-disclosure/game-master"] },
  ],
} as const satisfies Lore
