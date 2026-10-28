import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const deathParade = {
  id: "01a183da-662b-7044-9b61-1ac6526df9c8",
  type: "page-type/show",
  slug: "death-parade",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/death-parade"],
  publishedAt: "2015-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "61901",
      externalLink: "https://www.themoviedb.org/tv/61901",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Death Parade",
  streamingOn: ["Crunchyroll Amazon Channel"],
  createdAt: "2026-10-28T18:51:30.729Z",
  updatedAt: "2026-10-28T19:43:58.255Z",
} as const satisfies Show
