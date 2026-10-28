import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const tokyoGhoul = {
  id: "01a183d5-860a-799b-ba59-04f36c720855",
  type: "page-type/show",
  slug: "tokyo-ghoul",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/tokyo-ghoul"],
  publishedAt: "2014-07-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "61374",
      externalLink: "https://www.themoviedb.org/tv/61374",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Tokyo Ghoul",
  streamingOn: ["streaming-service/crunchyroll"],
  createdAt: "2026-10-28T18:46:11.206Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
