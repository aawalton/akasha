import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeVanishingAct = {
  id: "01a17497-3827-7fe9-b7e3-717597b9461a",
  type: "page-type/movie",
  slug: "jane-doe-vanishing-act",
  ownLength: 92,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 1,
  publishedAt: "2005-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "68688",
      externalLink: "https://www.themoviedb.org/movie/68688",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Jane_Doe:_Vanishing_Act" },
  ],
  title: "Jane Doe: Vanishing Act",
  genres: ["Crime", "Mystery", "TV Movie"],
  imdbId: "tt0440513",
  posterPath: "/qMQtmCrtfmXzgQJchUzs3BcGs6T.jpg",
  voteAverage: 5.8,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
