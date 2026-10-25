import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aHolidayInHarlem = {
  id: "01a1749a-2598-752a-89c8-3c9a11c7e669",
  type: "page-type/movie",
  slug: "a-holiday-in-harlem",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874219",
      externalLink: "https://www.themoviedb.org/movie/874219",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Holiday in Harlem",
  genres: ["Comedy", "Romance"],
  imdbId: "tt15485160",
  posterPath: "/3yvhFmOiVSDvBRwe0dyaw7aoWWN.jpg",
  voteAverage: 4.6,
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
