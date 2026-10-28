import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const horimiyaSeason1 = {
  id: "01a183d8-71ac-7ef2-b146-486c52977583",
  type: "page-type/season",
  slug: "horimiya-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/horimiya"],
  position: 1,
  publishedAt: "2021-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "163084",
      externalLink: "https://www.themoviedb.org/tv/110070/season/1",
    },
  ],
  title: "Horimiya Season 1",
  posterPath: "/917VL7zHTaltnEBDrKWVITTsvLy.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:49:22.603Z",
  updatedAt: "2026-10-28T18:49:22.603Z",
} as const satisfies Season
