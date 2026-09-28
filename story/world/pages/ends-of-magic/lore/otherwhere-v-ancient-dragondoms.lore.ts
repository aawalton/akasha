import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAncientDragondoms = {
  id: "01a0ea02-5e4a-7a11-9c25-69b3ed3ebf79",
  type: "page-type/lore",
  slug: "otherwhere-v-ancient-dragondoms",
  title: "The Ancient Dragondoms",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-ancient-dragondoms",
  facts: [
    {
      fact: "The ancient dragondoms were realms of Davrar's past ruled by dragons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kalis later surpassed the ancient dragondoms.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
