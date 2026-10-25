import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasQuest = {
  id: "01a1749a-89ab-7f20-ac9b-e31db087951d",
  type: "page-type/movie",
  slug: "the-christmas-quest",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1325912",
      externalLink: "https://www.themoviedb.org/movie/1325912",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Quest",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt32140747",
  posterPath: "/iWdCr0xFWQP2ei05pFpduyrTxwg.jpg",
  voteAverage: 6.79,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
