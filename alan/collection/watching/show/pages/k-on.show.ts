import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const kOn = {
  id: "01a183da-447b-78ba-b9c6-e3211ebac982",
  type: "page-type/show",
  slug: "k-on",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/k-on"],
  publishedAt: "2009-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "42253",
      externalLink: "https://www.themoviedb.org/tv/42253",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "K-ON!",
  streamingOn: ["streaming-service/hidive"],
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
