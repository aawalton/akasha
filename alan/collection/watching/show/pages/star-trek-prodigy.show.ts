import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekProdigy = {
  id: "01a06802-9332-702c-9bec-661cd67a807c",
  type: "page-type/show",
  slug: "star-trek-prodigy",
  title: "Star Trek: Prodigy",
  partOfCollections: ["fandom/star-trek-3"],
  position: 24,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-10-28",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-prodigy",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
