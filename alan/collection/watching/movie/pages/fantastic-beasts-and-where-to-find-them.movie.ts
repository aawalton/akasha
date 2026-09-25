import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fantasticBeastsAndWhereToFindThem = {
  id: "01a06802-6d99-700c-a344-55c632c48af2",
  type: "page-type/movie",
  slug: "fantastic-beasts-and-where-to-find-them",
  title: "Fantastic Beasts and Where to Find Them",
  partOfCollections: ["show-collection/fantastic-beasts-movie-series"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2016-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/fantastic-beasts-and-where-to-find-them-2016",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
