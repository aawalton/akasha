import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const monogatari = {
  id: "01a183db-793e-7d69-ad5e-48d95f780e9f",
  type: "page-type/show",
  slug: "monogatari",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/monogatari"],
  publishedAt: "2009-07-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "46195",
      externalLink: "https://www.themoviedb.org/tv/46195",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Monogatari",
  streamingOn: ["Crunchyroll", "Crunchyroll Amazon Channel"],
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T19:45:04.022Z",
} as const satisfies Show
