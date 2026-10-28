import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const violetEvergarden = {
  id: "01a183d5-4982-77c2-8fd2-e48b10a70c1f",
  type: "page-type/show",
  slug: "violet-evergarden",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/violet-evergarden"],
  publishedAt: "2018-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "75214",
      externalLink: "https://www.themoviedb.org/tv/75214",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Violet Evergarden",
  streamingOn: ["streaming-service/netflix"],
  createdAt: "2026-10-28T18:45:55.713Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
