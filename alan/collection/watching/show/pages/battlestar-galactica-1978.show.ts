import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const battlestarGalactica1978 = {
  id: "01a06802-9331-7009-a6f9-d1d2ee9c7cef",
  type: "page-type/show",
  slug: "battlestar-galactica-1978",
  title: "Battlestar Galactica (1978)",
  partOfCollections: ["fandom/battlestar-galactica"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1978-09-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/battlestar-galactica",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
