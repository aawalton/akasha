import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioSomeday = {
  id: "01a0676a-d729-7055-8d44-6acfab7de115",
  type: "page-type/release",
  slug: "jessica-baio-someday",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2023-01-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2BDwW5wZ3TYBUqL4XY0VCE",
      externalLink: "https://open.spotify.com/album/2BDwW5wZ3TYBUqL4XY0VCE",
    },
  ],
  title: "someday",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
