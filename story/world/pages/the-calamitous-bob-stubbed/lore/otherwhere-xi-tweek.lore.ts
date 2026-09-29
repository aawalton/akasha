import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTweek = {
  id: "01a0ea7d-3779-7dff-912a-21eda9831bd2",
  type: "page-type/lore",
  slug: "otherwhere-xi-tweek",
  title: "Tweek",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tweek",
  facts: [
    {
      fact: "Tweek is an old merl shaman, the merls' Prophet of War.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tweek is some fifty years old, old for a merl, and leads the council of Sikoua.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tweek met Viv when she was lost in the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tweek pledged Sikoua's merls to fight beside Harrak in the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tweek leads the merls of Sikoua in the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
