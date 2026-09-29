import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXGiantBeetle = {
  id: "01a0ea77-0fed-7f8b-a1aa-c51549eecd91",
  type: "page-type/lore",
  slug: "otherwhere-x-giant-beetle",
  title: "Giant Beetle",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-species/otherwhere-x-giant-beetle",
  facts: [
    {
      fact: "Giant beetles are Tier 1 monsters that roam rift forests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A kill reads "[Tier 1 Beetle slain. Essence gained.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rift monkeys hunt and eat giant beetles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giant beetles and oversized monkeys are the common fauna of the expedition rift.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
