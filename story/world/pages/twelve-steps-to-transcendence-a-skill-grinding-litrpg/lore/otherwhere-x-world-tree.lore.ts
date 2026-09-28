import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXWorldTree = {
  id: "01a0ea74-83f0-76d9-b4f0-1e4db3d9cae0",
  type: "page-type/lore",
  slug: "otherwhere-x-world-tree",
  title: "The World Tree",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-world-tree",
  facts: [
    {
      fact: "The world tree is the source of mana and essence.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mana is the world tree's pure energy and is present everywhere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Essence is also called the energy of the world tree.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Tier 0s have not "seen" the world tree.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reaching Tier 1 links the soul to the world tree and to a soul space.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "That link is what lets a Tier 1 view their own status.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
