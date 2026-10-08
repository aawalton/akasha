import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const harryPotterAndTheHalfBloodPrince = {
  id: "01a06802-6d99-7019-937a-77cfb12138da",
  type: "page-type/movie",
  slug: "harry-potter-and-the-half-blood-prince",
  title: "Harry Potter and the Half-Blood Prince",
  partOfCollections: ["show-collection/harry-potter-movie-series"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2009-07-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/harry-potter-and-the-half-blood-prince-2009",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
