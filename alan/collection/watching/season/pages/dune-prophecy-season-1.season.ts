import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const duneProphecySeason1 = {
  id: "01a06802-b8b9-702f-aed0-1c3f36843b6a",
  type: "page-type/season",
  slug: "dune-prophecy-season-1",
  title: "Dune: Prophecy Season 1",
  partOfCollections: ["show/dune-prophecy"],
  position: 1,
  ownLength: 393,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-295399",
      externalLink: "https://trakt.tv/shows/dune-prophecy/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
