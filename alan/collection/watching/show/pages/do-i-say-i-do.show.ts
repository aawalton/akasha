import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const doISayIDo = {
  id: "01a1749a-c86c-7c63-8089-410565264a11",
  type: "page-type/show",
  slug: "do-i-say-i-do",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-08-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "105203",
      externalLink: "https://www.themoviedb.org/tv/105203",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Do I Say I Do?",
  genres: ["Reality"],
  imdbId: "tt12540060",
  posterPath: "/5xNtHWWxt3vGSrfbPLdhSxmhMOp.jpg",
  voteAverage: 5.2,
  streamingOn: ["Netflix", "Netflix Standard with Ads"],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Show
