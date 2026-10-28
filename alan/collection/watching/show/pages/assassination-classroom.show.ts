import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const assassinationClassroom = {
  id: "01a183d6-93b7-7f76-9121-be5cc65c4593",
  type: "page-type/show",
  slug: "assassination-classroom",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/assassination-classroom"],
  publishedAt: "2015-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "62110",
      externalLink: "https://www.themoviedb.org/tv/62110",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Assassination Classroom",
  streamingOn: [
    "Crunchyroll",
    "Crunchyroll Amazon Channel",
    "Netflix",
    "Netflix Standard with Ads",
  ],
  createdAt: "2026-10-28T18:47:20.244Z",
  updatedAt: "2026-10-28T19:43:27.381Z",
} as const satisfies Show
