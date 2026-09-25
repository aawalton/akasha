import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const k9Season1 = {
  id: "01a06802-b8ba-702d-9997-187334236ada",
  type: "page-type/season",
  slug: "k-9-season-1",
  title: "K-9 Season 1",
  partOfCollections: ["show/k-9"],
  position: 1,
  ownLength: 702,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-10-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-36963",
      externalLink: "https://trakt.tv/shows/k-9/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
