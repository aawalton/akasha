import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekStrangeNewWorlds = {
  id: "01a06802-9332-702e-82d4-997bd82a0e4f",
  type: "page-type/show",
  slug: "star-trek-strange-new-worlds",
  title: "Star Trek: Strange New Worlds",
  partOfCollections: ["fandom/star-trek-3"],
  position: 25,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-05-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-strange-new-worlds",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
