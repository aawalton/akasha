import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioLoveSNotPain = {
  id: "01a0676a-d723-707b-9c8a-bf598f6ebf6a",
  type: "page-type/release",
  slug: "jessica-baio-love-s-not-pain",
  title: "love's not pain",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 12.535167,
  ownProgress: 12.535167,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2024-10-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0KFgeoREfHIGhvOiyWAAWn",
      externalLink: "https://open.spotify.com/album/0KFgeoREfHIGhvOiyWAAWn",
    },
  ],
} as const satisfies Release
