import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAdon = {
  id: "01a0ea75-bc70-7de0-a8b6-23ec9a9393dc",
  type: "page-type/lore",
  slug: "otherwhere-xi-adon",
  title: "Adon Goat-Fucker",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-adon",
  facts: [
    {
      fact: "Adon Goat-Fucker is a warrior of the southern beast-skin tribes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Adon fought with the southern warband under Cloud Skull at the Baranese pass against Halluria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Adon's whereabouts this season are unknown; he is thought to be with the southern tribes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
