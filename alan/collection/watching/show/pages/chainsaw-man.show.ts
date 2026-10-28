import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const chainsawMan = {
  id: "01a183d5-2788-70c4-aed1-b2a980de5e0a",
  type: "page-type/show",
  slug: "chainsaw-man",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/chainsaw-man"],
  publishedAt: "2022-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "114410",
      externalLink: "https://www.themoviedb.org/tv/114410",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Chainsaw Man",
  streamingOn: ["streaming-service/crunchyroll", "streaming-service/hulu"],
  createdAt: "2026-10-28T18:45:47.015Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
