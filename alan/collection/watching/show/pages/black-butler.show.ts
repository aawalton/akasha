import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const blackButler = {
  id: "01a183d8-99a9-7bfa-b1ad-c14c49135eed",
  type: "page-type/show",
  slug: "black-butler",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/black-butler"],
  publishedAt: "2008-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "50712",
      externalLink: "https://www.themoviedb.org/tv/50712",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Black Butler",
  streamingOn: ["streaming-service/crunchyroll", "streaming-service/hulu"],
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
