import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const helstrom = {
  id: "01a06802-9331-702e-b4b4-921d71c00856",
  type: "page-type/show",
  slug: "helstrom",
  title: "Helstrom",
  partOfCollections: ["fandom/marvel-television"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-10-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/helstrom",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
