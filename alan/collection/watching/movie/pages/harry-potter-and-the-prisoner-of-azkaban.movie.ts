import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const harryPotterAndThePrisonerOfAzkaban = {
  id: "01a06802-6d99-701c-901f-964b9d13db0b",
  type: "page-type/movie",
  slug: "harry-potter-and-the-prisoner-of-azkaban",
  title: "Harry Potter and the Prisoner of Azkaban",
  partOfCollections: ["show-collection/harry-potter-movie-series"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2004-06-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/harry-potter-and-the-prisoner-of-azkaban-2004",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
