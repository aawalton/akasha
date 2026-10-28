import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const evangelion3010ThriceUponATime = {
  id: "01a183d4-d930-7e59-aa47-dd2cf07f44f0",
  type: "page-type/movie",
  slug: "evangelion-3-0-1-0-thrice-upon-a-time",
  ownLength: 155,
  ownProgress: 0,
  partOfCollections: ["fandom/evangelion"],
  publishedAt: "2021-03-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283566",
      externalLink: "https://www.themoviedb.org/movie/283566",
    },
  ],
  title: "Evangelion: 3.0+1.0 Thrice Upon a Time",
  createdAt: "2026-10-28T18:45:26.960Z",
  updatedAt: "2026-10-28T18:45:26.960Z",
} as const satisfies Movie
