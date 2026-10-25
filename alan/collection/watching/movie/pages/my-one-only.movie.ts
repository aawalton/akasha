import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myOneOnly = {
  id: "01a17499-e805-7f6d-bebd-3a1f19a64e8d",
  type: "page-type/movie",
  slug: "my-one-only",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-08-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "622332",
      externalLink: "https://www.themoviedb.org/movie/622332",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My One & Only",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10651668",
  posterPath: "/u8zXclsKAAOewYLyCGc8gWyrhDV.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
