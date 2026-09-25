import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekDeepSpaceNine = {
  id: "01a06802-9332-7027-b141-6c49829dd910",
  type: "page-type/show",
  slug: "star-trek-deep-space-nine",
  title: "Star Trek: Deep Space Nine",
  partOfCollections: ["fandom/star-trek-3"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1993-01-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-deep-space-nine",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Show
