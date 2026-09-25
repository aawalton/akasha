import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const blackMirror = {
  id: "01a06802-9331-700b-997a-b4fca1a11bde",
  type: "page-type/show",
  slug: "black-mirror",
  title: "Black Mirror",
  partOfCollections: ["show-collection/speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-12-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/black-mirror",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
