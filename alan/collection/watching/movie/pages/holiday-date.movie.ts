import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayDate = {
  id: "01a1749a-06bc-72d1-94dd-6cad5b3e1ab1",
  type: "page-type/movie",
  slug: "holiday-date",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630924",
      externalLink: "https://www.themoviedb.org/movie/630924",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Date",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10768456",
  posterPath: "/o8XDtQQbplfbVLEa0RlQlbuXVBI.jpg",
  voteAverage: 6.55,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
