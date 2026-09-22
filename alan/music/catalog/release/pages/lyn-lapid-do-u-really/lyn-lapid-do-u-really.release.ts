import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidDoUReally = {
  id: "01a0676a-d71c-7019-96b7-a9646151303b",
  type: "page-type/release",
  slug: "lyn-lapid-do-u-really",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2023-02-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0GF4XbJWS3wXBssOfKFbb6",
      externalLink: "https://open.spotify.com/album/0GF4XbJWS3wXBssOfKFbb6",
    },
  ],
  title: "do u really?",
} as const satisfies Release
