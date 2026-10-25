import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aBrushWithLove = {
  id: "01a17499-e800-7ec9-ae05-55ea9ebcdc91",
  type: "page-type/movie",
  slug: "a-brush-with-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-03-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "586653",
      externalLink: "https://www.themoviedb.org/movie/586653",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Brush with Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9783876",
  posterPath: "/5XYvU5WyFPIf0RPEgPRzZ4HFiL7.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
