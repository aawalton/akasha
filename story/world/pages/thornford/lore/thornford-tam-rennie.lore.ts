import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const thornfordTamRennie = {
  id: "01a14b93-ca02-7d67-b532-4de31b1a4e30",
  type: "page-type/lore",
  slug: "thornford-tam-rennie",
  title: "Tam Rennie",
  world: "world/thornford",
  about: "character-other/thornford-tam-rennie",
  facts: [
    {
      fact: "Tam Rennie is Thornford's silversmith, with a shop by the market cross.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Tam can draw a silver needle in half a day, and asks a silver shilling for one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tam owes the guild nothing and has no love for Morag Bain.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-17T20:35:39.136Z",
  updatedAt: "2026-10-17T20:35:39.136Z",
} as const satisfies Lore
