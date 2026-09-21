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
} as const satisfies Release
