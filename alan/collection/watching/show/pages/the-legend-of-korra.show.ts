import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theLegendOfKorra = {
  id: "01a06802-9332-7049-a679-ea4818156d40",
  type: "page-type/show",
  slug: "the-legend-of-korra",
  title: "The Legend of Korra",
  partOfCollections: ["show-collection/family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-04-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-legend-of-korra",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
