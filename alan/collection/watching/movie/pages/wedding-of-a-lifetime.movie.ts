import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weddingOfALifetime = {
  id: "01a1749a-464f-744a-a148-e5ea8422ad2e",
  type: "page-type/movie",
  slug: "wedding-of-a-lifetime",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "999825",
      externalLink: "https://www.themoviedb.org/movie/999825",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Wedding of a Lifetime",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt21283490",
  posterPath: "/sZiGBV09gjbTx5pWJubPHASsOTv.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
