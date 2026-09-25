import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const harryPotterAndTheGobletOfFire = {
  id: "01a06802-6d99-7018-a0e4-1be48b404874",
  type: "page-type/movie",
  slug: "harry-potter-and-the-goblet-of-fire",
  title: "Harry Potter and the Goblet of Fire",
  partOfCollections: ["show-collection/harry-potter-movie-series"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2005-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/harry-potter-and-the-goblet-of-fire-2005",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
