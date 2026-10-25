import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasTreasure = {
  id: "01a1749a-2598-7ecf-8052-181c60483085",
  type: "page-type/movie",
  slug: "a-christmas-treasure",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "866660",
      externalLink: "https://www.themoviedb.org/movie/866660",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Treasure",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt15042590",
  posterPath: "/qTegIxclXI1P2nZBN3eo16YunBT.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
