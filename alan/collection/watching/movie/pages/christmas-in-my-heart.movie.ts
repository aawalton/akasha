import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInMyHeart = {
  id: "01a1749a-464a-7dc3-8850-48c13119241f",
  type: "page-type/movie",
  slug: "christmas-in-my-heart",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874152",
      externalLink: "https://www.themoviedb.org/movie/874152",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in My Heart",
  genres: ["TV Movie", "Drama", "Romance", "Music"],
  imdbId: "tt15655480",
  posterPath: "/tLmDLwzBCJu1oID4EkiORECVrZb.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
