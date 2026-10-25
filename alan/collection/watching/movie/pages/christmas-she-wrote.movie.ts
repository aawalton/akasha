import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasSheWrote = {
  id: "01a1749a-259a-740f-afa6-78ce2df1d88f",
  type: "page-type/movie",
  slug: "christmas-she-wrote",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746048",
      externalLink: "https://www.themoviedb.org/movie/746048",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas She Wrote",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13097858",
  posterPath: "/gxzNvCMMXCyb9u6eQZ9l8sUodjU.jpg",
  voteAverage: 6.1,
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
