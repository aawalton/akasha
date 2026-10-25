import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const adviceToLoveBy = {
  id: "01a1749a-2598-7b6e-9b4f-8c28d9d85722",
  type: "page-type/movie",
  slug: "advice-to-love-by",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "866657",
      externalLink: "https://www.themoviedb.org/movie/866657",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Advice to Love By",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt15215420",
  posterPath: "/jg3WEqRw9MAlWWjQ925gl8zRdmL.jpg",
  voteAverage: 5.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
