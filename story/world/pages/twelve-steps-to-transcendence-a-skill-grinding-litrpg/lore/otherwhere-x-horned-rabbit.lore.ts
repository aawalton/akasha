import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXHornedRabbit = {
  id: "01a0ea76-0b81-77b6-8fea-45a82f6486e8",
  type: "page-type/lore",
  slug: "otherwhere-x-horned-rabbit",
  title: "Horned Rabbit",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-species/otherwhere-x-horned-rabbit",
  facts: [
    {
      fact: "Horned rabbits have jagged bone spikes on their foreheads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Horned rabbits are Tier 1 creatures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A kill reads "[Tier 1 Horned Rabbit slain. Essence gained.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Horned rabbits live in the Western Plains forests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Horned rabbits are edible and make a meal for someone living off the forest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
