import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const scorpion = {
  id: "01a06802-9332-701e-9723-78bc22667366",
  type: "page-type/show",
  slug: "scorpion",
  title: "Scorpion",
  partOfCollections: ["show-collection/crime-investigation-shows"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/scorpion",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "60797", externalLink: "https://www.themoviedb.org/tv/60797" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Show
