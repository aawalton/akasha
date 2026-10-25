import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveRomanceChocolate = {
  id: "01a17499-e804-773c-861c-8841718c65dc",
  type: "page-type/movie",
  slug: "love-romance-chocolate",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "574936",
      externalLink: "https://www.themoviedb.org/movie/574936",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love, Romance & Chocolate",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9552488",
  posterPath: "/l0ay0Td2gxq2zEdAlphb2RsdeTX.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
