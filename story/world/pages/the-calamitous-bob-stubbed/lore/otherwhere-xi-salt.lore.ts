import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSalt = {
  id: "01a0ea87-7eb4-7266-bfdf-8dd2e0c003d5",
  type: "page-type/lore",
  slug: "otherwhere-xi-salt",
  title: "Salt",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-salt",
  facts: [
    {
      fact: "Salt is a crossbow soldier of the Bitter Hearts in Harrak's service.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Salt held the Bitter Hearts' stand in the Remnants war beside Nag, Feather, Auntie and Mug.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Salt is with the Bitter Hearts after the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
