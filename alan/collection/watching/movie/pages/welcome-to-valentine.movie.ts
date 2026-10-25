import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const welcomeToValentine = {
  id: "01a1749a-66c2-758e-9451-1e70980ca094",
  type: "page-type/movie",
  slug: "welcome-to-valentine",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1068823",
      externalLink: "https://www.themoviedb.org/movie/1068823",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Welcome to Valentine",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt25391092",
  posterPath: "/r6Msewaf41FUFT6XIr1Hn7VHOr4.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
