import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeTwilightZone = {
  id: "01a0676a-d72f-7026-8f71-bd8fc4a216a7",
  type: "page-type/release",
  slug: "ariana-grande-twilight-zone",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2025-06-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2OqSK4OKrorvnUzYunU2lX",
      externalLink: "https://open.spotify.com/album/2OqSK4OKrorvnUzYunU2lX",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "twilight zone",
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
