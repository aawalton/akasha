import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const msChristmasComesToTown = {
  id: "01a1749a-89a9-7346-98aa-3a1b48cf1e81",
  type: "page-type/movie",
  slug: "ms-christmas-comes-to-town",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180652",
      externalLink: "https://www.themoviedb.org/movie/1180652",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ms. Christmas Comes to Town",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt28651158",
  posterPath: "/yjPaHs1424IQbGbQrg0Y66JN6Cl.jpg",
  voteAverage: 7,
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
