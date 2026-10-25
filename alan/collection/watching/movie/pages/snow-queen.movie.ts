import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const snowQueen = {
  id: "01a17497-195d-74ce-bbe7-f77f881ab774",
  type: "page-type/movie",
  slug: "snow-queen",
  ownLength: 180,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2002-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "16174",
      externalLink: "https://www.themoviedb.org/movie/16174",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Snow_Queen_(2002_film)" },
  ],
  title: "Snow Queen",
  genres: ["Adventure", "Family", "Fantasy", "Science Fiction", "TV Movie"],
  imdbId: "tt0210294",
  posterPath: "/qufo7G0OTQs1hMtO7B5axnCdm4E.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
