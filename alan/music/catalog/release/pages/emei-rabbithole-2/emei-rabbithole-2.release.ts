import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiRabbithole2 = {
  id: "01a0676a-d727-703e-ac68-c952e4ba35f0",
  type: "page-type/release",
  slug: "emei-rabbithole-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2024-11-15",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gyUNc54TWzgzXtPvOdOYN",
      externalLink: "https://open.spotify.com/album/1gyUNc54TWzgzXtPvOdOYN",
    },
  ],
  title: "RABBITHOLE",
} as const satisfies Release
