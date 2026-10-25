import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const takingAShotAtLove = {
  id: "01a1749a-259d-7453-b43c-e39c9be3f390",
  type: "page-type/movie",
  slug: "taking-a-shot-at-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-01-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "775209",
      externalLink: "https://www.themoviedb.org/movie/775209",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Taking a Shot at Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13606088",
  posterPath: "/wperP8EmDlClErBF8zEdmMGNqKm.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "VIX ",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
