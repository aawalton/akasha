import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const gracieAbramsMinor = {
  id: "01a0676a-d724-706d-80a0-6af788ddda11",
  type: "page-type/release",
  slug: "gracie-abrams-minor",
  title: "minor",
  partOfCollections: ["artist/gracie-abrams"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2020-07-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2UZw04wDxLVceADw2Gi1Qy",
      externalLink: "https://open.spotify.com/album/2UZw04wDxLVceADw2Gi1Qy",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-10-15T14:00:33.419Z",
} as const satisfies Release
