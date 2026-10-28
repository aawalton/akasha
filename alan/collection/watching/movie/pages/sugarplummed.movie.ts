import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sugarplummed = {
  id: "01a1749a-89ab-7426-964e-71dfcb6b4409",
  type: "page-type/movie",
  slug: "sugarplummed",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1359060",
      externalLink: "https://www.themoviedb.org/movie/1359060",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sugarplummed",
  genres: ["TV Movie", "Comedy", "Fantasy"],
  imdbId: "tt33900751",
  posterPath: "/oI4K0OiWzZ9DiGHJXatJgtVveED.jpg",
  voteAverage: 7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
