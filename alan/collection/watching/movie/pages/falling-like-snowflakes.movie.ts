import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fallingLikeSnowflakes = {
  id: "01a1749a-89a8-7d93-8793-fd6ec432ebfd",
  type: "page-type/movie",
  slug: "falling-like-snowflakes",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-06-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1298472",
      externalLink: "https://www.themoviedb.org/movie/1298472",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Falling Like Snowflakes",
  genres: ["Romance", "Drama"],
  imdbId: "tt32622618",
  posterPath: "/8cvvrXqR5OBovGJpDRVqZpQrVNI.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
