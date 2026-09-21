import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioCrossedTheLine = {
  id: "01a0676a-d71b-703f-88f7-cc2639836f56",
  type: "page-type/release",
  slug: "jessica-baio-crossed-the-line",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2022-06-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3uHxJ5d59sPuN3M5e9iwZ0",
      externalLink: "https://open.spotify.com/album/3uHxJ5d59sPuN3M5e9iwZ0",
    },
  ],
  title: "crossed the line",
} as const satisfies Release
