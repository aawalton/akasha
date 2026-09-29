import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGanimatalo = {
  id: "01a0ea83-df1d-7158-aa4b-14b36d0ebee5",
  type: "page-type/lore",
  slug: "otherwhere-xi-ganimatalo",
  title: "Mayor Ganimatalo",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ganimatalo",
  facts: [
    {
      fact: "Ganimatalo was mayor of Kazar in the days before Viv came.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ganimatalo gathered the civil servants who later ran Kazar for Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ganimatalo died long ago, and Kazar honours him among its past dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
