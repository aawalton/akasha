import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const angelBeats = {
  id: "01a183dd-3da3-766a-bd55-ef01e10ee8f9",
  type: "page-type/show",
  slug: "angel-beats",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/angel-beats"],
  publishedAt: "2010-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "42942",
      externalLink: "https://www.themoviedb.org/tv/42942",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Angel Beats!",
  streamingOn: ["streaming-service/crunchyroll"],
  createdAt: "2026-10-28T18:54:36.961Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
