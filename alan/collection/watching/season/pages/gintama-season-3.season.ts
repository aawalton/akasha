import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gintamaSeason3 = {
  id: "01a183d6-3279-777b-9d3e-82a054b8d26a",
  type: "page-type/season",
  slug: "gintama-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/gintama"],
  position: 3,
  publishedAt: "2008-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "58344",
      externalLink: "https://www.themoviedb.org/tv/57041/season/3",
    },
  ],
  title: "Gintama Season 3",
  posterPath: "/7fmFSKjiE1nqhsi7XccuSM8UzmD.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Season
