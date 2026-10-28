import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const evangelion10YouAreNotAlone = {
  id: "01a183d4-ca17-760a-a8e8-c46044fd8e42",
  type: "page-type/movie",
  slug: "evangelion-1-0-you-are-not-alone",
  ownLength: 101,
  ownProgress: 0,
  partOfCollections: ["fandom/evangelion"],
  publishedAt: "2007-09-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "15137", externalLink: "https://www.themoviedb.org/movie/15137" },
  ],
  title: "Evangelion: 1.0 You Are (Not) Alone",
  createdAt: "2026-10-28T18:45:23.095Z",
  updatedAt: "2026-10-28T18:45:23.095Z",
} as const satisfies Movie
