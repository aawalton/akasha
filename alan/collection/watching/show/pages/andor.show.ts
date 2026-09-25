import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const andor = {
  id: "01a06802-9331-7005-b34b-e628e5eba5a9",
  type: "page-type/show",
  slug: "andor",
  title: "Andor",
  partOfCollections: ["fandom/star-wars-2"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-wars-andor",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
