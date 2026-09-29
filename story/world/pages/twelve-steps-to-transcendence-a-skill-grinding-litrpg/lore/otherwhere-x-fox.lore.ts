import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXFox = {
  id: "01a0ea77-0fec-7d85-9a95-f79317652281",
  type: "page-type/lore",
  slug: "otherwhere-x-fox",
  title: "Large Fox",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-species/otherwhere-x-fox",
  facts: [
    {
      fact: "Large foxes live in the Western Plains forests near the noble expedition camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Large foxes have claimed territory around the forest waterfall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The same forest holds ordinary birds, squirrels, deer and boars.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
