import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const deliverByChristmas = {
  id: "01a1749a-259a-7d76-ba39-9684a798e1fa",
  type: "page-type/movie",
  slug: "deliver-by-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737777",
      externalLink: "https://www.themoviedb.org/movie/737777",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Deliver by Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11847642",
  posterPath: "/uFCTa0dj4xJu2RotzrXTTXSkhkf.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
