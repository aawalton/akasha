import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const harryPotterAndTheDeathlyHallowsPart2 = {
  id: "01a06802-6d99-7017-b277-00fdec1b9aeb",
  type: "page-type/movie",
  slug: "harry-potter-and-the-deathly-hallows-part-2",
  title: "Harry Potter and the Deathly Hallows – Part 2",
  partOfCollections: ["show-collection/harry-potter-movie-series"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2011-07-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/harry-potter-and-the-deathly-hallows-part-2-2011",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
