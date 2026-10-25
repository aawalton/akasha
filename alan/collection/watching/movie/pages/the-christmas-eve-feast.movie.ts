import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasEveFeast = {
  id: "01a1749a-c86b-7a25-8e0f-576410b754be",
  type: "page-type/movie",
  slug: "the-christmas-eve-feast",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773318",
      externalLink: "https://www.themoviedb.org/movie/1773318",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Eve Feast",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt43655245",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
