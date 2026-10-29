import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const showClass = {
  id: "01a06802-9331-7010-ba51-c0d25803c45e",
  type: "page-type/show",
  slug: "show-class",
  title: "Class",
  partOfCollections: ["fandom/doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-10-22",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/class", lastSyncedAt: "2025-10-01" },
    { source: "tmdb", externalId: "65152", externalLink: "https://www.themoviedb.org/tv/65152" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:40:29.924Z",
} as const satisfies Show
