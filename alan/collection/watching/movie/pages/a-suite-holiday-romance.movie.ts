import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSuiteHolidayRomance = {
  id: "01a1749a-c868-72bd-80c2-aadae14f0ff2",
  type: "page-type/movie",
  slug: "a-suite-holiday-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547925",
      externalLink: "https://www.themoviedb.org/movie/1547925",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Suite Holiday Romance",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt38354975",
  posterPath: "/srjYgIahAUR78YWpBbbw9orukk9.jpg",
  voteAverage: 6.909,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
