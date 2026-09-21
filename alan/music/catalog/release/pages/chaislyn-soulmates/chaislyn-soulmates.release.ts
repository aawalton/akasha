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
} as const satisfies Release
