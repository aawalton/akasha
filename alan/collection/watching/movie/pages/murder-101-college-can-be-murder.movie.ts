import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murder101CollegeCanBeMurder = {
  id: "01a17497-3829-7143-9cee-e540b038bb98",
  type: "page-type/movie",
  slug: "murder-101-college-can-be-murder",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/murder-101"],
  position: 2,
  publishedAt: "2007-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "254127",
      externalLink: "https://www.themoviedb.org/movie/254127",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Murder_101:_College_Can_Be_Murder",
    },
  ],
  title: "Murder 101: College Can Be Murder",
  genres: ["TV Movie", "Drama", "Mystery", "Crime"],
  imdbId: "tt0958145",
  posterPath: "/vQavPDIAcq0BjMNvpqRwrbkURh4.jpg",
  voteAverage: 7.1,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
