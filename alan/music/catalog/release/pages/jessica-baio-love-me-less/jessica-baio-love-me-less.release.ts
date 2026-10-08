import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioLoveMeLess = {
  id: "01a0676a-d723-7070-82ea-8065f00e0526",
  type: "page-type/release",
  slug: "jessica-baio-love-me-less",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2025-08-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2JOgbxyVzZB6nnslNcCSI7",
      externalLink: "https://open.spotify.com/album/2JOgbxyVzZB6nnslNcCSI7",
    },
  ],
  title: "love me less",
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
