import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const romeInLove = {
  id: "01a17499-e806-7256-8326-6439d907e5cf",
  type: "page-type/movie",
  slug: "rome-in-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-07-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "612298",
      externalLink: "https://www.themoviedb.org/movie/612298",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Rome in Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7049178",
  posterPath: "/1B49Sjm4EtibDyfIdMwU02LRHj8.jpg",
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
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
