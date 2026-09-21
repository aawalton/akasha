import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioLoveSNotPain = {
  id: "01a0676a-d723-707b-9c8a-bf598f6ebf6a",
  type: "page-type/release",
  slug: "jessica-baio-love-s-not-pain",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2024-10-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0KFgeoREfHIGhvOiyWAAWn",
      externalLink: "https://open.spotify.com/album/0KFgeoREfHIGhvOiyWAAWn",
    },
  ],
  title: "love's not pain",
} as const satisfies Release
