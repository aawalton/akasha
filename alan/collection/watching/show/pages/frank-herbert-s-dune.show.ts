import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const frankHerbertSDune = {
  id: "01a06802-9331-7026-8d4c-fbf74857c382",
  type: "page-type/show",
  slug: "frank-herbert-s-dune",
  title: "Frank Herbert's Dune",
  partOfCollections: ["fandom/dune-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2000-12-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/frank-herbert-s-dune",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
