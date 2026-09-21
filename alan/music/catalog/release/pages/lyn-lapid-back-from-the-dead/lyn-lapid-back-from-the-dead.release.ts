import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidBackFromTheDead = {
  id: "01a0676a-d717-7048-bbb2-968848565b37",
  type: "page-type/release",
  slug: "lyn-lapid-back-from-the-dead",
  title: "back from the dead",
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  ownLength: 2.634333,
  ownProgress: 2.634333,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2024-05-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3xiULM7K8q360Xg9jmon9x",
      externalLink: "https://open.spotify.com/album/3xiULM7K8q360Xg9jmon9x",
    },
  ],
} as const satisfies Release
