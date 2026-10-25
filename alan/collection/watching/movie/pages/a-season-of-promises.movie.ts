import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSeasonOfPromises = {
  id: "01a1749a-c868-7a7d-a04d-f7073bd654f4",
  type: "page-type/movie",
  slug: "a-season-of-promises",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773353",
      externalLink: "https://www.themoviedb.org/movie/1773353",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Season of Promises",
  genres: ["Romance"],
  imdbId: "tt46075510",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
