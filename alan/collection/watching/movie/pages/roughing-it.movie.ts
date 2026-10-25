import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const roughingIt = {
  id: "01a17497-195d-70a6-a14e-352aaafd1d3a",
  type: "page-type/movie",
  slug: "roughing-it",
  ownLength: 185,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2002-03-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "109698",
      externalLink: "https://www.themoviedb.org/movie/109698",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Roughing_It" },
  ],
  title: "Roughing It",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0290280",
  posterPath: "/4grlbTHC9DK3PRYlugCjfsk3PyY.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
