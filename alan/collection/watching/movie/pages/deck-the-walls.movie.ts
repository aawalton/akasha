import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const deckTheWalls = {
  id: "01a1749a-89a8-7db1-ab3f-cc0af6310239",
  type: "page-type/movie",
  slug: "deck-the-walls",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361211",
      externalLink: "https://www.themoviedb.org/movie/1361211",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Deck the Walls",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33885024",
  posterPath: "/1bHSS5RV8CHalQIZ1Z9qEjRcJQf.jpg",
  voteAverage: 6.2,
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
