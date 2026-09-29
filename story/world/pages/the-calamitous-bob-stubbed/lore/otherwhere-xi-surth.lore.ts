import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSurth = {
  id: "01a0ea86-c327-7f27-89e5-36d8acd835c0",
  type: "page-type/lore",
  slug: "otherwhere-xi-surth",
  title: "Surth",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-surth",
  facts: [
    {
      fact: "Surth is a kark beastmaster of the Red Tribe, keeper of its pakar mounts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Surth is with the Red Tribe after the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
