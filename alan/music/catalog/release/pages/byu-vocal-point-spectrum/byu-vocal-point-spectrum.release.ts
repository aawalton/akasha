import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const byuVocalPointSpectrum = {
  id: "01a0676a-d729-7077-978d-75f49afafbe9",
  type: "page-type/release",
  slug: "byu-vocal-point-spectrum",
  title: "Spectrum",
  partOfCollections: ["artist/byu-vocal-point"],
  position: 0,
  ownLength: 51.979767,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-04-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2N0M8t3QUusPrgXfMHqP14",
      externalLink: "https://open.spotify.com/album/2N0M8t3QUusPrgXfMHqP14",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Release
