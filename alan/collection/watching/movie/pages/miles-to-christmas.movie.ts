import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const milesToChristmas = {
  id: "01a1749a-c86a-7e08-b4e3-7b823a6a459f",
  type: "page-type/movie",
  slug: "miles-to-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773293",
      externalLink: "https://www.themoviedb.org/movie/1773293",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Miles to Christmas",
  genres: ["Romance"],
  imdbId: "tt40629979",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
