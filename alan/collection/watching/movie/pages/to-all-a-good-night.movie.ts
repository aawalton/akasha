import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const toAllAGoodNight = {
  id: "01a1749a-89ac-74f2-9f6f-1db5be5a7151",
  type: "page-type/movie",
  slug: "to-all-a-good-night",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180744",
      externalLink: "https://www.themoviedb.org/movie/1180744",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "To All a Good Night",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt29593734",
  posterPath: "/o8nPpvhMQq3GFVCjyooIqJNCy6o.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
