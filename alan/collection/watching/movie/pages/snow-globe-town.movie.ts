import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const snowGlobeTown = {
  id: "01a1749a-c86b-793b-bf60-b5b8aadfb60f",
  type: "page-type/movie",
  slug: "snow-globe-town",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773035",
      externalLink: "https://www.themoviedb.org/movie/1773035",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Snow Globe Town",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt41783274",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
