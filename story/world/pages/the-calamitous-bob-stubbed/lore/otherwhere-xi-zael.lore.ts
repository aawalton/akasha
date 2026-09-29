import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiZael = {
  id: "01a0ea8c-6e91-7dc7-ba3d-844b26e56763",
  type: "page-type/lore",
  slug: "otherwhere-xi-zael",
  title: "Zael",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-zael",
  facts: [
    {
      fact: "Zael is an armored guard of the Academy of Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Zael's whereabouts are unknown, since Oleander took Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
