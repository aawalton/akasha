import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const narutoShippuden = {
  id: "01a183d2-3bf9-7385-9202-35a2d006efbd",
  type: "page-type/show",
  slug: "naruto-shippuden",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/naruto"],
  publishedAt: "2007-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "31910",
      externalLink: "https://www.themoviedb.org/tv/31910",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Naruto Shippūden",
  streamingOn: ["streaming-service/crunchyroll", "streaming-service/hulu"],
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
