import type { Show } from "akasha/alan/library/watching/show/show.page-type.types.ts"

export const wednesday = {
  id: "01a06802-9333-700e-9d40-1efa47023a87",
  type: "show",
  slug: "wednesday",
  title: "Wednesday",
  partOfCollections: ["show-collection/award-winning-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "A",
  publishedAt: "2022-11-23",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/wednesday",
      lastSyncedAt: "2026-01-02",
    },
  ],
} as const satisfies Show
