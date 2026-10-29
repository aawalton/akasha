import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ahsoka = {
  id: "01a06802-9331-7004-bb3e-0cc318b540b4",
  type: "page-type/show",
  slug: "ahsoka",
  title: "Ahsoka",
  partOfCollections: ["fandom/star-wars-2"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-08-22",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/ahsoka", lastSyncedAt: "2025-10-01" },
    { source: "tmdb", externalId: "114461", externalLink: "https://www.themoviedb.org/tv/114461" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:24:17.663Z",
} as const satisfies Show
