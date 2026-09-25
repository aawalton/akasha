import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const daredevilBornAgain = {
  id: "01a06802-9331-7018-8a1b-d262fe2ccc4e",
  type: "page-type/show",
  slug: "daredevil-born-again",
  title: "Daredevil: Born Again",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 55,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-03-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/daredevil-born-again",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
