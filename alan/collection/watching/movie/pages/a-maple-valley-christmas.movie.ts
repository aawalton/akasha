import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aMapleValleyChristmas = {
  id: "01a1749a-66bb-7d7f-b211-e5868a29416f",
  type: "page-type/movie",
  slug: "a-maple-valley-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027442",
      externalLink: "https://www.themoviedb.org/movie/1027442",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Maple Valley Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt21841642",
  posterPath: "/mMpXU9tJOtOGdMkUTJzotJbNd1j.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
