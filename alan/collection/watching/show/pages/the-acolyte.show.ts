import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theAcolyte = {
  id: "01a06802-9332-7041-914f-5b6bcd175b90",
  type: "page-type/show",
  slug: "the-acolyte",
  title: "The Acolyte",
  partOfCollections: ["fandom/star-wars-2"],
  position: 23,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-06-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-acolyte",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
