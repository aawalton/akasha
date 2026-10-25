import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnIceland = {
  id: "01a1749a-06bd-7b31-a837-35f5893dcd66",
  type: "page-type/movie",
  slug: "love-on-iceland",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "649880",
      externalLink: "https://www.themoviedb.org/movie/649880",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on Iceland",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt11274564",
  posterPath: "/6Ms64L6H4ffrjz6NwA6NAw1rGjZ.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
