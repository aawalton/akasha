import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const inTheBeginning = {
  id: "01a06802-6d99-701d-b11c-b4c330b79a85",
  type: "page-type/movie",
  slug: "in-the-beginning",
  title: "In the Beginning",
  partOfCollections: ["fandom/babylon-5-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1998-01-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "babylon-5-in-the-beginning-1998",
      externalLink: "https://trakt.tv/movies/babylon-5-in-the-beginning-1998",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Movie
