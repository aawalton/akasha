import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const frankHerbertSDuneMiniseries = {
  id: "01a06802-b8ba-7002-beee-ac3103046081",
  type: "page-type/season",
  slug: "frank-herbert-s-dune-miniseries",
  title: "Frank Herbert's Dune Miniseries",
  partOfCollections: ["show/frank-herbert-s-dune"],
  position: 1,
  ownLength: 285,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2000-12-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-30606",
      externalLink: "https://trakt.tv/shows/frank-herbert-s-dune/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
