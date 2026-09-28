import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVUnderworldMagic = {
  id: "01a0ea01-fcc5-7ead-a936-86857fe916ec",
  type: "page-type/lore",
  slug: "otherwhere-v-underworld-magic",
  title: "Magic of the Underworld",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-underworld-magic",
  facts: [
    {
      fact: "The underworld beneath Davrar teems with monsters, magic, dungeons and monstrous ecosystems.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only true powers dare walk the underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Great strongholds can be carved into underworld caverns, lit by purple crystal pillars.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The underworld is counted a fit place for great deeds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leylines of magic run beneath the ground.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
