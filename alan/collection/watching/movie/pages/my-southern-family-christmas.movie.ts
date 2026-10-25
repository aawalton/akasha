import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mySouthernFamilyChristmas = {
  id: "01a1749a-464c-7cf7-b8e5-bd8b724e7a10",
  type: "page-type/movie",
  slug: "my-southern-family-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028558",
      externalLink: "https://www.themoviedb.org/movie/1028558",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Southern Family Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22247540",
  posterPath: "/c318CHh7DeyfORPhDUASRQIoSSA.jpg",
  voteAverage: 6.442,
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
