import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const nellyKnowsMysteriesAllMannersOfMurder = {
  id: "01a1749a-c86a-7f6e-8b6b-c5ad8c81a6cb",
  type: "page-type/movie",
  slug: "nelly-knows-mysteries-all-manners-of-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/nelly-knows-mysteries"],
  position: 2,
  publishedAt: "2026-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1622649",
      externalLink: "https://www.themoviedb.org/movie/1622649",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Nelly Knows Mysteries: All Manners of Murder",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt35979236",
  posterPath: "/fyFB9ivzImj3eZfIE5mfCwMjny1.jpg",
  voteAverage: 5.571,
  streamingOn: [
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
