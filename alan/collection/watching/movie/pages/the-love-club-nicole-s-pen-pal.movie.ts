import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLoveClubNicoleSPenPal = {
  id: "01a1749a-89ab-7d93-9040-79ecc9bbb121",
  type: "page-type/movie",
  slug: "the-love-club-nicole-s-pen-pal",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-love-club"],
  position: 1,
  publishedAt: "2023-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1053306",
      externalLink: "https://www.themoviedb.org/movie/1053306",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Love Club: Nicole's Pen Pal",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt26682546",
  posterPath: "/82uEidSSiuKzm9t96kg1ImVLt84.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T20:45:25.537Z",
} as const satisfies Movie
