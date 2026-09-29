import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiCentralPrincipalities = {
  id: "01a0ea8a-7b78-7807-8830-9c4e055940e7",
  type: "page-type/place",
  slug: "otherwhere-xi-central-principalities",
  title: "The Central Principalities",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-golden-coast",
  facts: [
    {
      fact: "The Central Principalities are the middle of Vizim's Golden Coast, between Sheem and Sandsong.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Central Principalities are a patchwork of small Viziman principalities.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Central Principalities lie across the Viziman Ocean, weeks by ship from Param.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Central Principalities fell under Sheem and Oleander when Vizim was conquered this winter.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
