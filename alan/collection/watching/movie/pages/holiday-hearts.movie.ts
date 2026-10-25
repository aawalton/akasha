import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayHearts = {
  id: "01a1749a-06bc-7673-954f-b905263d64f0",
  type: "page-type/movie",
  slug: "holiday-hearts",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "638806",
      externalLink: "https://www.themoviedb.org/movie/638806",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Hearts",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10925434",
  posterPath: "/2Nryi61rn5hAIZlKWl6qw6mHsb1.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
