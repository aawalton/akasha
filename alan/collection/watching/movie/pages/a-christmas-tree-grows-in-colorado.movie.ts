import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasTreeGrowsInColorado = {
  id: "01a1749a-06b9-7ccd-bac1-a61ca3f3481b",
  type: "page-type/movie",
  slug: "a-christmas-tree-grows-in-colorado",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737764",
      externalLink: "https://www.themoviedb.org/movie/737764",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Tree Grows in Colorado",
  genres: ["Family", "Romance", "TV Movie"],
  imdbId: "tt12557978",
  posterPath: "/bAzFQKGPQOX8pJ86Bzo4qaqQWga.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
