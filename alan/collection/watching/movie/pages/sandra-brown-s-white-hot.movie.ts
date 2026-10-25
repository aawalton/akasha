import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sandraBrownSWhiteHot = {
  id: "01a17499-a7d7-7848-a429-08276a266561",
  type: "page-type/movie",
  slug: "sandra-brown-s-white-hot",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2016-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "385585",
      externalLink: "https://www.themoviedb.org/movie/385585",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sandra Brown's White Hot",
  genres: ["TV Movie", "Drama", "Mystery"],
  imdbId: "tt5589750",
  posterPath: "/oWvaaEYQlrdD9It4ejs05Nq5Vqv.jpg",
  voteAverage: 5.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
