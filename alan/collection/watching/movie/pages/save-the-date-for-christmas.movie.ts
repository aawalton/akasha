import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const saveTheDateForChristmas = {
  id: "01a1749a-c86b-7785-b305-10e303ea78f2",
  type: "page-type/movie",
  slug: "save-the-date-for-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-12-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773265",
      externalLink: "https://www.themoviedb.org/movie/1773265",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Save the Date for Christmas",
  genres: ["Romance"],
  imdbId: "tt46076940",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
