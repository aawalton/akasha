import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theQuintessentialQuintuplets = {
  id: "01a183de-02a1-7b34-8604-cd671c07d8aa",
  type: "page-type/show",
  slug: "the-quintessential-quintuplets",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/the-quintessential-quintuplets"],
  publishedAt: "2019-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "84669",
      externalLink: "https://www.themoviedb.org/tv/84669",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "The Quintessential Quintuplets",
  streamingOn: ["streaming-service/crunchyroll"],
  createdAt: "2026-10-28T18:55:27.391Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
