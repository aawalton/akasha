import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hardGround = {
  id: "01a17497-3826-76b0-9ac3-112b0cf2a260",
  type: "page-type/movie",
  slug: "hard-ground",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2003-07-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "36487",
      externalLink: "https://www.themoviedb.org/movie/36487",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Hard_Ground" },
  ],
  title: "Hard Ground",
  genres: ["Western", "TV Movie"],
  imdbId: "tt0349529",
  posterPath: "/4cRzHSws5GLrI3OZsSpYQBHdUF4.jpg",
  voteAverage: 4.5,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
