import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const blackMirror = {
  id: "01a06802-9331-700b-997a-b4fca1a11bde",
  type: "page-type/show",
  slug: "black-mirror",
  title: "Black Mirror",
  partOfCollections: ["show-collection/speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-12-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/black-mirror",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "42009", externalLink: "https://www.themoviedb.org/tv/42009" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Show
