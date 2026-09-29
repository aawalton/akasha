import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMountainSons = {
  id: "01a0ea7e-cc4a-7df0-943f-558c92a56f8f",
  type: "page-type/lore",
  slug: "otherwhere-xi-mountain-sons",
  title: "The Mountain Sons",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-mountain-sons",
  facts: [
    {
      fact: "The Mountain Sons are raised from the mountain people who joined Kazar's rebellion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Mountain Sons wear red scarves in battle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Mountain Sons are also called the Mountain Lords.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Mountain Sons are the most disciplined of Harrak's companies.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
