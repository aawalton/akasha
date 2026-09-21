import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiAtmosphere = {
  id: "01a0676a-d717-703c-9932-4307a58abe3d",
  type: "page-type/release",
  slug: "vinny-marchi-atmosphere",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-08-04",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2oB2N2ZcmvGqrXzvUUlIi9",
      externalLink: "https://open.spotify.com/album/2oB2N2ZcmvGqrXzvUUlIi9",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Atmosphere",
} as const satisfies Release
