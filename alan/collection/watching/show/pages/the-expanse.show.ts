import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theExpanse = {
  id: "01a06802-9332-7047-be1a-773a5c200330",
  type: "page-type/show",
  slug: "the-expanse",
  title: "The Expanse",
  partOfCollections: ["show-collection/science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-12-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-expanse",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
