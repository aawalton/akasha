import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDeathEel = {
  id: "01a0ea84-e791-715e-938e-7a075728c8b3",
  type: "page-type/lore",
  slug: "otherwhere-xi-death-eel",
  title: "Death Eel",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-death-eel",
  facts: [
    {
      fact: "Death eels live in the waters of the Shadowlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shadowlanders name death eels among the deadliest beasts of their isles.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
