import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const audreySRain = {
  id: "01a17497-195c-7e4d-b15c-3dbe121ff212",
  type: "page-type/movie",
  slug: "audrey-s-rain",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2003-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "212062",
      externalLink: "https://www.themoviedb.org/movie/212062",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Audrey's Rain",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0352188",
  posterPath: "/x7EUbvXQioYu7BPb4tOIEMfR0M1.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
