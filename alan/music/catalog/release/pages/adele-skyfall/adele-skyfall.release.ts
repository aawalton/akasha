import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adeleSkyfall = {
  id: "01a0676a-d729-701e-92ba-8e7d57852632",
  type: "page-type/release",
  slug: "adele-skyfall",
  title: "Skyfall",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-10-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6TwN6Lq9glwnG8kNp6chHY",
      externalLink: "https://open.spotify.com/album/6TwN6Lq9glwnG8kNp6chHY",
      lastSyncedAt: "2026-02-09",
    },
  ],
} as const satisfies Release
