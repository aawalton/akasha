import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const skipBeatSeason1 = {
  id: "01a183da-8846-729d-afd6-aa8f5a9a7a4e",
  type: "page-type/season",
  slug: "skip-beat-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/skip-beat"],
  position: 1,
  publishedAt: "2008-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54820",
      externalLink: "https://www.themoviedb.org/tv/46669/season/1",
    },
  ],
  title: "Skip Beat! Season 1",
  posterPath: "/n1gxmbea6bwopWTYyg91czQfNGE.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:51:39.460Z",
  updatedAt: "2026-10-28T18:51:39.460Z",
} as const satisfies Season
