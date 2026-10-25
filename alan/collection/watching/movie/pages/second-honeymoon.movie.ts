import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const secondHoneymoon = {
  id: "01a17497-195d-73ac-86b1-5874719e7336",
  type: "page-type/movie",
  slug: "second-honeymoon",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2001-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "390904",
      externalLink: "https://www.themoviedb.org/movie/390904",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Second Honeymoon",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt0248415",
  posterPath: "/oEzkeWJxBHDmkA1H1nlc4RCkCUt.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
