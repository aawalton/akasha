import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const friends = {
  id: "01a06802-9331-7027-a7a5-c33a3e8acd9d",
  type: "page-type/show",
  slug: "friends",
  title: "Friends",
  partOfCollections: ["show-collection/sitcoms"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1994-09-23",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/friends", lastSyncedAt: "2025-10-01" },
  ],
} as const satisfies Show
