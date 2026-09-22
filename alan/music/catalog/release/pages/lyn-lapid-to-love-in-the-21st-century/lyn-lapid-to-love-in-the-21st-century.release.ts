import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidToLoveInThe21stCentury = {
  id: "01a0676a-d72f-7005-bb5a-c5a39d806d3d",
  type: "page-type/release",
  slug: "lyn-lapid-to-love-in-the-21st-century",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2023-06-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "18pzJc8GyrVQmunRXrY3ch",
      externalLink: "https://open.spotify.com/album/18pzJc8GyrVQmunRXrY3ch",
    },
  ],
  title: "to love in the 21st century",
} as const satisfies Release
