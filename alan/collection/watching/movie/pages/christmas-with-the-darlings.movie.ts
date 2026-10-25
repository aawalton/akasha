import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasWithTheDarlings = {
  id: "01a1749a-06bb-77c6-aef5-25037d1486a1",
  type: "page-type/movie",
  slug: "christmas-with-the-darlings",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746032",
      externalLink: "https://www.themoviedb.org/movie/746032",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas with the Darlings",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13381368",
  posterPath: "/wp9CZP0rs134nfvAK5fsMq8kz9e.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
