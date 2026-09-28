import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVCastlebear = {
  id: "01a0e9f9-9dd6-73ba-9f72-4b08eaf3a6cc",
  type: "page-type/lore",
  slug: "otherwhere-v-castlebear",
  title: "Castlebear",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-castlebear",
  facts: [
    {
      fact: "Castlebears are dangerous beasts best left alone, known across Gemore's sayings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "\"Don't bait the castlebear\" means don't provoke trouble needlessly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Goats to a castlebear" means easy prey.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
