import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidTheOutsiderEp = {
  id: "01a0676a-d72d-7051-b08a-b07fb86b477c",
  type: "page-type/release",
  slug: "lyn-lapid-the-outsider-ep",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2022-04-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0c7zKLCs5B2Q34GStRLahp",
      externalLink: "https://open.spotify.com/album/0c7zKLCs5B2Q34GStRLahp",
    },
  ],
  title: "The Outsider EP",
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-09-22T14:00:43.000Z",
} as const satisfies Release
