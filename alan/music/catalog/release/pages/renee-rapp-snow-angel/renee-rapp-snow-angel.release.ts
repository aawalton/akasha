import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const reneeRappSnowAngel = {
  id: "01a0676a-d729-7039-b36a-b43ac54e1e43",
  type: "page-type/release",
  slug: "renee-rapp-snow-angel",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/renee-rapp"],
  position: 0,
  publishedAt: "2023-08-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3RqO05jxT9YYgNtMdQmo8Z",
      externalLink: "https://open.spotify.com/album/3RqO05jxT9YYgNtMdQmo8Z",
    },
  ],
  title: "Snow Angel",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-22T20:00:29.000Z",
} as const satisfies Release
