import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekShortTreks = {
  id: "01a06802-9332-702d-b081-9741b5369c0e",
  type: "page-type/show",
  slug: "star-trek-short-treks",
  title: "Star Trek: Short Treks",
  partOfCollections: ["fandom/star-trek-3"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-short-treks",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "82491", externalLink: "https://www.themoviedb.org/tv/82491" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:41:53.775Z",
} as const satisfies Show
