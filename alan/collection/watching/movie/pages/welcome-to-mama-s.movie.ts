import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const welcomeToMamaS = {
  id: "01a1749a-464f-7e5e-b9d2-106a997162c6",
  type: "page-type/movie",
  slug: "welcome-to-mama-s",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "921587",
      externalLink: "https://www.themoviedb.org/movie/921587",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Welcome to Mama's",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15802082",
  posterPath: "/3SBGkMdTSWSJaHa5unX7mksgeZt.jpg",
  voteAverage: 6.6,
  streamingOn: ["Hallmark+ Amazon Channel", "Hallmark+ Apple TV channel", "Philo", "fuboTV"],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
