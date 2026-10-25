import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const underTheAutumnMoon = {
  id: "01a17499-c960-71e0-a519-3888d835c492",
  type: "page-type/movie",
  slug: "under-the-autumn-moon",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "547242",
      externalLink: "https://www.themoviedb.org/movie/547242",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Under the Autumn Moon",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8863322",
  posterPath: "/svRZLiJZxs6vfTHN14UJuAMLEsZ.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
