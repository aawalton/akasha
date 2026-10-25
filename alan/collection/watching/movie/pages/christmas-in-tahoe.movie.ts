import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInTahoe = {
  id: "01a1749a-2599-75c0-a69e-82b9b2a8236b",
  type: "page-type/movie",
  slug: "christmas-in-tahoe",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874226",
      externalLink: "https://www.themoviedb.org/movie/874226",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Tahoe",
  genres: ["TV Movie", "Romance", "Drama", "Comedy"],
  imdbId: "tt15739494",
  posterPath: "/oTqpT4yqo2uXr7CSYDWHTiIOe6c.jpg",
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
