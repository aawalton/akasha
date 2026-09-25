import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ironheart = {
  id: "01a06802-9332-7004-b436-5f6a0fdfa1fc",
  type: "page-type/show",
  slug: "ironheart",
  title: "Ironheart",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 58,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-06-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/ironheart",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
