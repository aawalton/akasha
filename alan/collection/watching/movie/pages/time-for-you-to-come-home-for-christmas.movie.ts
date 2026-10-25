import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const timeForYouToComeHomeForChristmas = {
  id: "01a1749a-06bf-7ac7-9726-d5ebfc0a6ffa",
  type: "page-type/movie",
  slug: "time-for-you-to-come-home-for-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "639409",
      externalLink: "https://www.themoviedb.org/movie/639409",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Time for You to Come Home for Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11068326",
  posterPath: "/pHZEFRlk5iAuMqsD6lQxUYg68GI.jpg",
  voteAverage: 6.8,
  streamingOn: ["fuboTV"],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
