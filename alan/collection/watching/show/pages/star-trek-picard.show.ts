import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekPicard = {
  id: "01a06802-9332-702b-82c2-0d21d3814d8d",
  type: "page-type/show",
  slug: "star-trek-picard",
  title: "Star Trek: Picard",
  partOfCollections: ["fandom/star-trek-3"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-01-23",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-picard",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
