import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioCrossedTheLine = {
  id: "01a0676a-d71b-703f-88f7-cc2639836f56",
  type: "page-type/release",
  slug: "jessica-baio-crossed-the-line",
  title: "crossed the line",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 2.730083,
  ownProgress: 2.730083,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2022-06-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3uHxJ5d59sPuN3M5e9iwZ0",
      externalLink: "https://open.spotify.com/album/3uHxJ5d59sPuN3M5e9iwZ0",
    },
  ],
} as const satisfies Release
