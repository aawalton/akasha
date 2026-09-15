import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiAtmosphere = {
  id: "01a0676a-d717-703c-9932-4307a58abe3d",
  type: "release",
  slug: "vinny-marchi-atmosphere",
  title: "Atmosphere",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 3.415183,
  ownProgress: 3.415183,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-08-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2oB2N2ZcmvGqrXzvUUlIi9",
      externalLink: "https://open.spotify.com/album/2oB2N2ZcmvGqrXzvUUlIi9",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
