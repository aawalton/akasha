import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSeasonForFamily = {
  id: "01a1749a-89a6-7db8-94ea-6bc3d8135bcb",
  type: "page-type/movie",
  slug: "a-season-for-family",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180798",
      externalLink: "https://www.themoviedb.org/movie/1180798",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Season for Family",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt29513272",
  posterPath: "/8M3xrDQENIwptlUJgld6meNwReD.jpg",
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
