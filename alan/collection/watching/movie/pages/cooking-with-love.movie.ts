import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const cookingWithLove = {
  id: "01a17499-c95b-761e-a3ad-28745f70ab02",
  type: "page-type/movie",
  slug: "cooking-with-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "497515",
      externalLink: "https://www.themoviedb.org/movie/497515",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Cooking with Love",
  genres: ["Comedy", "TV Movie", "Romance"],
  imdbId: "tt7874116",
  posterPath: "/fxV4yA8bQjp6dgjjEpaWtgyGbgA.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
