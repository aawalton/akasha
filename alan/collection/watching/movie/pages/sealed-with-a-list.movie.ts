import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sealedWithAList = {
  id: "01a1749a-89aa-7f30-b312-0114dad9788c",
  type: "page-type/movie",
  slug: "sealed-with-a-list",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180688",
      externalLink: "https://www.themoviedb.org/movie/1180688",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sealed with a List",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt29233395",
  posterPath: "/bTqVu19sejNUyboLSjHOS5H7Y4T.jpg",
  voteAverage: 6.5,
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
