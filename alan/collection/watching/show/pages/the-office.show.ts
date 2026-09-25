import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theOffice = {
  id: "01a06802-9332-704e-9a9b-1dd4aa74293f",
  type: "page-type/show",
  slug: "the-office",
  title: "The Office",
  partOfCollections: ["show-collection/sitcoms"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2005-03-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-office",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
