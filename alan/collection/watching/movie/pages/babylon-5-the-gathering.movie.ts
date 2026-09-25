import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const babylon5TheGathering = {
  id: "01a06802-6d98-700c-bf73-58a4ed5bfe7c",
  type: "page-type/movie",
  slug: "babylon-5-the-gathering",
  title: "Babylon 5: The Gathering",
  partOfCollections: ["fandom/babylon-5-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1993-02-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "babylon-5-the-gathering-1993",
      externalLink: "https://trakt.tv/movies/babylon-5-the-gathering-1993",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Movie
