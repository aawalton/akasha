import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const hawkeye = {
  id: "01a06802-9331-702d-b007-506640a3957c",
  type: "page-type/show",
  slug: "hawkeye",
  title: "Hawkeye",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 32,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-11-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/hawkeye-2021",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "88329", externalLink: "https://www.themoviedb.org/tv/88329" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T16:29:26.300Z",
} as const satisfies Show
