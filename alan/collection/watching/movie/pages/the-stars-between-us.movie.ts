import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theStarsBetweenUs = {
  id: "01a1749a-c86b-7101-87f4-c8a6b293e24d",
  type: "page-type/movie",
  slug: "the-stars-between-us",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1608619",
      externalLink: "https://www.themoviedb.org/movie/1608619",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Stars Between Us",
  genres: ["Romance"],
  imdbId: "tt39300784",
  posterPath: "/yltItS6duf9MfSVn45oUupFu1oO.jpg",
  voteAverage: 5.6,
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
