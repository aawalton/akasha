import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAlchemistsGuild = {
  id: "01a0ea89-4775-717b-b067-1447535069c0",
  type: "page-type/lore",
  slug: "otherwhere-xi-alchemists-guild",
  title: "The Alchemists' Guild",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-alchemists-guild",
  facts: [
    {
      fact: "The alchemists' guild caused a disaster in Helock in the year 512.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The disaster left a round crater lake with a glass bottom in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The alchemists' guild is banned from operating within Helock since that disaster.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
