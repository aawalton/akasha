import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynSoulmates = {
  id: "01a0676a-d729-706e-b3c5-e17012c9f527",
  type: "page-type/release",
  slug: "chaislyn-soulmates",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2023-06-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40ObQxWvt56zul3OaUMrQx",
      externalLink: "https://open.spotify.com/album/40ObQxWvt56zul3OaUMrQx",
    },
  ],
  title: "Soulmates",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
