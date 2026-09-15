import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiRabbithole2 = {
  id: "01a0676a-d727-703e-ac68-c952e4ba35f0",
  type: "release",
  slug: "emei-rabbithole-2",
  title: "RABBITHOLE",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 12.593067,
  ownProgress: 12.593067,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2024-11-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gyUNc54TWzgzXtPvOdOYN",
      externalLink: "https://open.spotify.com/album/1gyUNc54TWzgzXtPvOdOYN",
    },
  ],
} as const satisfies Release
