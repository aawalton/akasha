import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theBigBangTheory = {
  id: "01a06802-9332-7042-bab6-4bb636b043cc",
  type: "page-type/show",
  slug: "the-big-bang-theory",
  title: "The Big Bang Theory",
  partOfCollections: ["show-collection/sitcoms"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "1418", externalLink: "https://www.themoviedb.org/tv/1418" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Show
