import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveAtTheShore = {
  id: "01a17499-a7d5-7fe0-9f30-29f6a84f0606",
  type: "page-type/movie",
  slug: "love-at-the-shore",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-08-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "465381",
      externalLink: "https://www.themoviedb.org/movie/465381",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love at the Shore",
  genres: ["Romance", "Comedy", "Family", "TV Movie"],
  imdbId: "tt6937070",
  posterPath: "/q6t7odhFFQuWwDDNVuEqyXihhVC.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "VIX ",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
