import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRockBear = {
  id: "01a0ea82-747e-7909-a2f2-85a3b03d9e73",
  type: "page-type/lore",
  slug: "otherwhere-xi-rock-bear",
  title: "Rock Bear",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-rock-bear",
  facts: [
    {
      fact: "A rock bear is a white bear covered in armour-like plates.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A rock bear raises walls of ice and earth with magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A rock bear roars to stun, then drags its prey away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rock bears roam the moors and forests of Baran's marches and raid villages in winter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A slain rock bear yields a core, and its meat makes a hearty stew.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
