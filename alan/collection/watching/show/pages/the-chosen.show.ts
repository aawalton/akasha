import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theChosen = {
  id: "01a06802-9332-7044-ba34-6521f4f44287",
  type: "page-type/show",
  slug: "the-chosen",
  title: "The Chosen",
  partOfCollections: ["show-collection/award-winning-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  grade: "S",
  publishedAt: "2019-04-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-chosen",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
