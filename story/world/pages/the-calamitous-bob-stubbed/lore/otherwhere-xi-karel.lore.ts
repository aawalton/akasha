import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKarel = {
  id: "01a0ea8c-81fc-7f20-9ab0-039f0133e574",
  type: "page-type/lore",
  slug: "otherwhere-xi-karel",
  title: "Karel",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-karel",
  facts: [
    {
      fact: "Karel was an associate of the Kazar thief boss Edric, who named him before dying.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "What became of Karel is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
