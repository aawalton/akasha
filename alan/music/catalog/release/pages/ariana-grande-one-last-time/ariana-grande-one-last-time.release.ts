import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeOneLastTime = {
  id: "01a0676a-d726-702b-9ad8-079dee54b0a1",
  type: "page-type/release",
  slug: "ariana-grande-one-last-time",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2014-08-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2jU2AI6nKiV3y50cnlgAkx",
      externalLink: "https://open.spotify.com/album/2jU2AI6nKiV3y50cnlgAkx",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "One Last Time",
} as const satisfies Release
