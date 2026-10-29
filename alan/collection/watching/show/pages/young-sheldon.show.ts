import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const youngSheldon = {
  id: "01a06802-9333-7011-b346-db5cd5909917",
  type: "page-type/show",
  slug: "young-sheldon",
  title: "Young Sheldon",
  partOfCollections: ["show-collection/sitcoms"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/young-sheldon",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "71728", externalLink: "https://www.themoviedb.org/tv/71728" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Show
