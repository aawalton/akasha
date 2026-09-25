import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allTheBrightPlaces = {
  id: "01a06802-6d98-7002-915f-2612d5fd49eb",
  type: "page-type/movie",
  slug: "all-the-bright-places",
  title: "All the Bright Places",
  partOfCollections: ["show-collection/watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-02-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "all-the-bright-places-2020",
      externalLink: "https://app.trakt.tv/movies/all-the-bright-places-2020",
      lastSyncedAt: "2025-11-06",
    },
  ],
} as const satisfies Movie
