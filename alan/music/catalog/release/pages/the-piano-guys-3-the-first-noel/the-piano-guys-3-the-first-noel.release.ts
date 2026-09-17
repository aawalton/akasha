import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3TheFirstNoel = {
  id: "01a0676a-d72d-7011-b2ad-33d360dbf5e6",
  type: "page-type/release",
  slug: "the-piano-guys-3-the-first-noel",
  ownLength: 2.816666666666667,
  ownProgress: 2.816667,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2023-12-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3nBIM8otWKKi5VDU7NUt3h",
      externalLink: "https://open.spotify.com/album/3nBIM8otWKKi5VDU7NUt3h",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The First Noel",
} as const satisfies Release
