import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theApothecaryDiaries = {
  id: "01a13bc8-43b8-7dea-8a6b-a8c320cc85c9",
  type: "page-type/show",
  slug: "the-apothecary-diaries",
  title: "The Apothecary Diaries",
  streamingOn: [
    "Crunchyroll",
    "Crunchyroll Amazon Channel",
    "Hulu",
    "Netflix",
    "Netflix Standard with Ads",
  ],
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/the-apothecary-diaries"],
  unit: "unit/minutes",
  status: "in-progress",
  publishedAt: "2023-10-22",
  externalIdentity: [
    {
      source: "netflix",
      externalId: "81712068",
      externalLink: "https://www.netflix.com/title/81712068",
    },
    {
      source: "tmdb",
      externalId: "220542",
      externalLink: "https://www.themoviedb.org/tv/220542",
      lastSyncedAt: "2026-10-28",
    },
  ],
  createdAt: "2026-10-14T18:59:02.711Z",
  updatedAt: "2026-10-28T19:46:18.908Z",
} as const satisfies Show
