import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const charmingChristmas = {
  id: "01a17499-8944-7e92-b81d-9a17ef2ecbc9",
  type: "page-type/movie",
  slug: "charming-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "363476",
      externalLink: "https://www.themoviedb.org/movie/363476",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Charming Christmas",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt5156770",
  posterPath: "/kDPaywj4BrVRq8p183dBURhYR1J.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
