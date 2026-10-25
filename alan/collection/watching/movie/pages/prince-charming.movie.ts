import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const princeCharming = {
  id: "01a17497-195d-7dac-9ba5-cb4a0bc88628",
  type: "page-type/movie",
  slug: "prince-charming",
  ownLength: 91,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2001-07-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "51532",
      externalLink: "https://www.themoviedb.org/movie/51532",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Prince_Charming_(2001_film)",
    },
  ],
  title: "Prince Charming",
  genres: ["Adventure", "Fantasy", "Romance"],
  imdbId: "tt0261203",
  posterPath: "/sma7B0TJNGfXMzi5Ob9HZOsmsP8.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
