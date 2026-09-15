import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2WhatHurtsTheMost = {
  id: "01a0676a-d730-7047-92f9-edf3a725f26d",
  type: "page-type/release",
  slug: "backstreet-boys-2-what-hurts-the-most",
  title: "What Hurts The Most",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 3.516667,
  ownProgress: 3.516667,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-05-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2DZobefozyw6OtL3NNYK4w",
      externalLink: "https://open.spotify.com/album/2DZobefozyw6OtL3NNYK4w",
    },
  ],
} as const satisfies Release
