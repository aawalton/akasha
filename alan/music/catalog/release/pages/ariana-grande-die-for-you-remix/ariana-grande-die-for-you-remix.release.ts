import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeDieForYouRemix = {
  id: "01a0676a-d71c-7012-824c-db9ca1da6fee",
  type: "page-type/release",
  slug: "ariana-grande-die-for-you-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2023-02-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Exo0MYoL3XammoTDeihFy",
      externalLink: "https://open.spotify.com/album/6Exo0MYoL3XammoTDeihFy",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Die For You (Remix)",
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
