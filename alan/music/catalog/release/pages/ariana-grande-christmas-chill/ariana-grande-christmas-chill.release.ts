import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeChristmasChill = {
  id: "01a0676a-d71a-7033-8bfc-5a63842f4d36",
  type: "page-type/release",
  slug: "ariana-grande-christmas-chill",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2015-12-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5wJD60fqranwuUGvOGSiyt",
      externalLink: "https://open.spotify.com/album/5wJD60fqranwuUGvOGSiyt",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Christmas & Chill",
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
