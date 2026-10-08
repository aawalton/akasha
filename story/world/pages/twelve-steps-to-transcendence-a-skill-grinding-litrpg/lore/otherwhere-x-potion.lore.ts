import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXPotion = {
  id: "01a0ea7a-5bda-74c5-bb07-f5c665fa8438",
  type: "page-type/lore",
  slug: "otherwhere-x-potion",
  title: "Potion",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-potion",
  facts: [
    {
      fact: "Noble hunting parties carry potions into rifts and the wilds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A hard fight can use up half a party's potions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Expensive elixirs are fed to noble children to enlarge their core capacity.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:04:42.586Z",
  updatedAt: "2026-09-29T00:04:46.000Z",
} as const satisfies Lore
