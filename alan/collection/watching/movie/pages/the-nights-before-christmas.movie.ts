import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theNightsBeforeChristmas = {
  id: "01a1749a-c86b-737a-850d-b7580d0dbd6a",
  type: "page-type/movie",
  slug: "the-nights-before-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773345",
      externalLink: "https://www.themoviedb.org/movie/1773345",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Nights Before Christmas",
  genres: ["Romance"],
  imdbId: "tt46076002",
  posterPath: "/313RVYAdotWQQRuUSrZj9CIoEdk.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
