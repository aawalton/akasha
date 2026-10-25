import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const deckTheHallsOnCherryLane = {
  id: "01a1749a-a949-7559-ab42-a717925b30ba",
  type: "page-type/movie",
  slug: "deck-the-halls-on-cherry-lane",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1359236",
      externalLink: "https://www.themoviedb.org/movie/1359236",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Deck the Halls on Cherry Lane",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt34355959",
  posterPath: "/hlhoZwNZgq9L1Jip9BVvLtGDbdw.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
