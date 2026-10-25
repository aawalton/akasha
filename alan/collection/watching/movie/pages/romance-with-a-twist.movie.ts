import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const romanceWithATwist = {
  id: "01a1749a-89aa-7f80-baee-2bcafb02f85e",
  type: "page-type/movie",
  slug: "romance-with-a-twist",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1212667",
      externalLink: "https://www.themoviedb.org/movie/1212667",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Romance with a Twist",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt30259980",
  posterPath: "/mhZzOqRKtMsdoFJqG1zsp7xzJ8H.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
