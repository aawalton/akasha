import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMug = {
  id: "01a0ea81-9b14-72d0-9738-4d52fc0753e8",
  type: "page-type/lore",
  slug: "otherwhere-xi-mug",
  title: "Mug",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-mug",
  facts: [
    {
      fact: "Mug is a crossbow soldier of the Bitter Hearts in Harrak's service.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mug held the Bitter Hearts' famous stand in the Remnants war with Nag, Feather, Salt and Auntie.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Mug is with the Bitter Hearts after the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
