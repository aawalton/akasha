import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const severance = {
  id: "01a06802-9332-7020-ba2a-d2a2a8e27945",
  type: "page-type/show",
  slug: "severance",
  title: "Severance",
  partOfCollections: ["show-collection/science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "A",
  publishedAt: "2022-02-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/severance",
      lastSyncedAt: "2026-01-03",
    },
  ],
} as const satisfies Show
