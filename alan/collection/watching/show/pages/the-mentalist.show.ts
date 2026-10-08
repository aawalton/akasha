import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theMentalist = {
  id: "01a06802-9332-704d-acc2-2f07248ff37c",
  type: "page-type/show",
  slug: "the-mentalist",
  title: "The Mentalist",
  partOfCollections: [
    "show-collection/crime-investigation-shows",
    "show-collection/watch-with-jen",
  ],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "the-mentalist",
      externalLink: "https://trakt.tv/shows/the-mentalist",
      lastSyncedAt: "2026-01-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
