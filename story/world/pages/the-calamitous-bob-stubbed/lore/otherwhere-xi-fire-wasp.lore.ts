import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiFireWasp = {
  id: "01a0ea81-9842-745c-8584-74888ebb66cd",
  type: "page-type/lore",
  slug: "otherwhere-xi-fire-wasp",
  title: "Fire Wasp",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-fire-wasp",
  facts: [
    {
      fact: "Fire wasps are scarlet wasps about a finger long, with a burning sting.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fire wasps nest wild in Enoria's forests and borderlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The yries keep fire wasps as honey bees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Yries catapults fling fire wasps at the enemy, and they use fire ants as weapons too.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak's knights are nicknamed fire wasps.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
