import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const winterLoveStory = {
  id: "01a17499-e807-707c-8e69-0249057ba1f4",
  type: "page-type/movie",
  slug: "winter-love-story",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "570193",
      externalLink: "https://www.themoviedb.org/movie/570193",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Winter Love Story",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9556756",
  posterPath: "/rc74668MV4J3CC60L7qDu1RlLLK.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
