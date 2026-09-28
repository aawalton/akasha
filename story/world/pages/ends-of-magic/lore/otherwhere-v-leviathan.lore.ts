import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLeviathan = {
  id: "01a0e9fa-0d15-7d08-acac-eb60bf12a931",
  type: "page-type/lore",
  slug: "otherwhere-v-leviathan",
  title: "Leviathan",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-leviathan",
  facts: [
    {
      fact: "Leviathans of the deeps are the greatest of sea beasts, far worse than redeyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The most aggressive leviathans of all live near vortices, sources of powerful magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ships cross far waters hoping to face neither a redeye nor a leviathan.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
