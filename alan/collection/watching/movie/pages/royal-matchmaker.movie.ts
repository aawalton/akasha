import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const royalMatchmaker = {
  id: "01a17499-c95e-7c28-819e-4cfa6d194693",
  type: "page-type/movie",
  slug: "royal-matchmaker",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "501689",
      externalLink: "https://www.themoviedb.org/movie/501689",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Royal Matchmaker",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8111210",
  posterPath: "/j8i0iUMww0QmPSjiPG4yEf21CVY.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
