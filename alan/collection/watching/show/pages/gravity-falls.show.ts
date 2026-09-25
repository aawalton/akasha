import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const gravityFalls = {
  id: "01a06802-9331-702c-b050-bde2ea2b2bf2",
  type: "page-type/show",
  slug: "gravity-falls",
  title: "Gravity Falls",
  partOfCollections: ["show-collection/family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-06-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/gravity-falls",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
