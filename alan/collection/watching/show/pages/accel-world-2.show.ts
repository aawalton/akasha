import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const accelWorld2 = {
  id: "01a06802-9331-7000-857f-7257b49b7619",
  type: "page-type/show",
  slug: "accel-world-2",
  title: "Accel World",
  partOfCollections: ["fandom/accel-world"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2012-04-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "accel-world",
      externalLink: "https://trakt.tv/shows/accel-world",
      lastSyncedAt: "2025-10-13",
    },
  ],
} as const satisfies Show
