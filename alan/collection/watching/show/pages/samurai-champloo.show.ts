import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const samuraiChamploo = {
  id: "01a183dd-7327-78ee-a00e-edc63f82bb54",
  type: "page-type/show",
  slug: "samurai-champloo",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/samurai-champloo"],
  publishedAt: "2004-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1063",
      externalLink: "https://www.themoviedb.org/tv/1063",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Samurai Champloo",
  streamingOn: ["streaming-service/crunchyroll"],
  createdAt: "2026-10-28T18:54:50.662Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
