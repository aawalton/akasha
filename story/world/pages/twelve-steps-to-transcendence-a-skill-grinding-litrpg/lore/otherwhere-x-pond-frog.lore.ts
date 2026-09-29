import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXPondFrog = {
  id: "01a0ea77-0fee-7c44-b063-9e346f9be816",
  type: "page-type/lore",
  slug: "otherwhere-x-pond-frog",
  title: "Pond Frog",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-species/otherwhere-x-pond-frog",
  facts: [
    {
      fact: "A pond frog is car-sized, dark green and warted, with red eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pond frog lurks at the bottom of a pond, guarding it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has static cloaking that hides it while it keeps still.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its long pink tongue punches through flesh or trees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pond frog will not leave the water willingly and retreats into it to heal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pond frog is a weak Tier 2 made strong by its pond's essence.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A kill reads "[Tier 2 Pond Frog slain. Essence gained.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The expedition rift's pond frog is dead, killed in a fight over its pond.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
