import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hisHers = {
  id: "01a1749a-89a9-722a-b0af-3b757d09eb3d",
  type: "page-type/movie",
  slug: "his-hers",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-09-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1325847",
      externalLink: "https://www.themoviedb.org/movie/1325847",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "His & Hers",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt32588758",
  posterPath: "/ugjFBjpoTpAqDXyYkBJUKL2Vw1G.jpg",
  voteAverage: 6.206,
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
