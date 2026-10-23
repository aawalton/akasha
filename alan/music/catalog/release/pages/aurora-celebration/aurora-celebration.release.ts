import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraCelebration = {
  id: "01a1690d-e324-75fb-a2f0-bbe432dd2ef5",
  type: "page-type/release",
  slug: "aurora-celebration",
  ownLength: 25.507083333333334,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1zt5FNt3ohlWlRjS4L2DIc",
      externalLink: "https://open.spotify.com/album/1zt5FNt3ohlWlRjS4L2DIc",
      lastSyncedAt: "2026-10-23",
    },
  ],
  title: "CELEBRATION",
  createdAt: "2026-10-23T13:58:00.227Z",
  updatedAt: "2026-10-23T13:58:00.227Z",
} as const satisfies Release
