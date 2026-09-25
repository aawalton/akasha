import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dunePartOne = {
  id: "01a06802-6d99-7007-9305-738b4198c7a1",
  type: "page-type/movie",
  slug: "dune-part-one",
  title: "Dune: Part One",
  partOfCollections: ["fandom/dune-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-10-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/dune-2021",
      lastSyncedAt: "2025-09-30",
    },
  ],
} as const satisfies Movie
