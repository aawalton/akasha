import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAntalisQueen = {
  id: "01a0ea83-ee79-73a5-9704-6f2fd439bd17",
  type: "page-type/lore",
  slug: "otherwhere-xi-antalis-queen",
  title: "Antalis Queen",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-antalis-queen",
  facts: [
    {
      fact: "An Antalis queen is a huge beast of the Deadshield Woods, its back like a ridge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Antalis queen casts brown earth magic by nature, and it is dangerous.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Antalis queen meat is tasty.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
