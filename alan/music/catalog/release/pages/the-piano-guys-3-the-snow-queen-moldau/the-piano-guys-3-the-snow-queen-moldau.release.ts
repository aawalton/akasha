import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3TheSnowQueenMoldau = {
  id: "01a0676a-d72e-700c-94b6-bd480cb52443",
  type: "page-type/release",
  slug: "the-piano-guys-3-the-snow-queen-moldau",
  ownLength: 4.925,
  ownProgress: 4.925,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2023-12-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3OPUxH5s77LARjXmm8mWHX",
      externalLink: "https://open.spotify.com/album/3OPUxH5s77LARjXmm8mWHX",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Snow Queen (Moldau)",
} as const satisfies Release
