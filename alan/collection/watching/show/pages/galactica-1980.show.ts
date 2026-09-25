import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const galactica1980 = {
  id: "01a06802-9331-7029-a507-718aab929aaf",
  type: "page-type/show",
  slug: "galactica-1980",
  title: "Galactica 1980",
  partOfCollections: ["fandom/battlestar-galactica"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1980-01-28",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/galactica-1980",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
