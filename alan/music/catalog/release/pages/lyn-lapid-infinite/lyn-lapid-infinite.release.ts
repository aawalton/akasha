import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidInfinite = {
  id: "01a0676a-d721-7071-962d-eb377e8e65ef",
  type: "page-type/release",
  slug: "lyn-lapid-infinite",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2021-06-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65CkIcNtt9s4JQAboajshU",
      externalLink: "https://open.spotify.com/album/65CkIcNtt9s4JQAboajshU",
    },
  ],
  title: "Infinite",
} as const satisfies Release
