import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiSorewan = {
  id: "01a0ea88-4595-7fad-9b79-e9571a420d57",
  type: "page-type/place",
  slug: "otherwhere-xi-sorewan",
  title: "Sorewan",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-baran",
  facts: [
    {
      fact: "Sorewan is a region at the center of Baran and its richest domain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sorewan makes most of Baran's steel and half its weapons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sorewan is the domain of Lady Azar, called the Shadow Duchess, mother of Queen Rosea.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
