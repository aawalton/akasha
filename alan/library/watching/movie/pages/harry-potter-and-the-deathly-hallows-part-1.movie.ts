import type { Movie } from "akasha/alan/library/watching/movie/movie.page-type.types.ts"

export const harryPotterAndTheDeathlyHallowsPart1 = {
  id: "01a06802-6d99-7016-bfd0-52afdc569464",
  type: "movie",
  slug: "harry-potter-and-the-deathly-hallows-part-1",
  title: "Harry Potter and the Deathly Hallows – Part 1",
  partOfCollections: ["show-collection/harry-potter-movie-series"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2010-11-19",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/harry-potter-and-the-deathly-hallows-part-1-2010",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
