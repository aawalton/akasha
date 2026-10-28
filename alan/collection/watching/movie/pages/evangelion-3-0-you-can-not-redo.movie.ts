import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const evangelion30YouCanNotRedo = {
  id: "01a183d4-d400-78db-b64c-186be26f430f",
  type: "page-type/movie",
  slug: "evangelion-3-0-you-can-not-redo",
  ownLength: 96,
  ownProgress: 0,
  partOfCollections: ["fandom/evangelion"],
  publishedAt: "2012-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "75629", externalLink: "https://www.themoviedb.org/movie/75629" },
  ],
  title: "Evangelion: 3.0 You Can (Not) Redo",
  createdAt: "2026-10-28T18:45:25.632Z",
  updatedAt: "2026-10-28T18:45:25.632Z",
} as const satisfies Movie
