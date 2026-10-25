import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasHouse2DeckThoseHalls = {
  id: "01a1749a-464d-7f57-91f1-e55e1b8ac00a",
  type: "page-type/movie",
  slug: "the-christmas-house-2-deck-those-halls",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-christmas-house"],
  position: 2,
  publishedAt: "2021-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874196",
      externalLink: "https://www.themoviedb.org/movie/874196",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas House 2: Deck Those Halls",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt16365840",
  posterPath: "/cWccc2GZL0w4IUiW2d4o81c8A28.jpg",
  voteAverage: 5.35,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:16.967Z",
} as const satisfies Movie
