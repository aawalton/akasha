import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidBackFromTheDead = {
  id: "01a0676a-d717-7048-bbb2-968848565b37",
  type: "page-type/release",
  slug: "lyn-lapid-back-from-the-dead",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2024-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3xiULM7K8q360Xg9jmon9x",
      externalLink: "https://open.spotify.com/album/3xiULM7K8q360Xg9jmon9x",
    },
  ],
  title: "back from the dead",
} as const satisfies Release
