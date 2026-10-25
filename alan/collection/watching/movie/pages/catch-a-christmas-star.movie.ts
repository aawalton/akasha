import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const catchAChristmasStar = {
  id: "01a17499-669d-7bb4-8644-6302b3ec9b54",
  type: "page-type/movie",
  slug: "catch-a-christmas-star",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "238304",
      externalLink: "https://www.themoviedb.org/movie/238304",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Catch_a_Christmas_Star" },
  ],
  title: "Catch a Christmas Star",
  genres: ["Family", "Romance", "TV Movie"],
  imdbId: "tt3131532",
  posterPath: "/40nMble3uFagwJ7ffagvefbcKCJ.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
