import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const manifest = {
  id: "01a06802-9332-7008-be14-d612bae3fa84",
  type: "page-type/show",
  slug: "manifest",
  title: "Manifest",
  partOfCollections: ["show-collection/watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "in-progress",
  publishedAt: "2018-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "manifest",
      externalLink: "https://trakt.tv/shows/manifest",
      lastSyncedAt: "2026-01-01",
    },
  ],
} as const satisfies Show
