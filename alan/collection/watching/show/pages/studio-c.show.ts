import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const studioC = {
  id: "01a06802-9332-703e-bf45-659f474888d4",
  type: "page-type/show",
  slug: "studio-c",
  title: "Studio C",
  partOfCollections: ["show-collection/comedy-shows", "show-collection/watch-with-lizzy"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "C",
  publishedAt: "2012-10-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/studio-c",
      lastSyncedAt: "2026-01-20",
    },
  ],
} as const satisfies Show
