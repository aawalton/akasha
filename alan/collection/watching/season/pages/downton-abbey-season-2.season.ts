import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const downtonAbbeySeason2 = {
  id: "01a06802-b8b9-7029-b6aa-6b4a7d96114a",
  type: "page-type/season",
  slug: "downton-abbey-season-2",
  title: "Downton Abbey Season 2",
  partOfCollections: ["show/downton-abbey"],
  position: 2,
  ownLength: 474,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-09-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-45535",
      externalLink: "https://trakt.tv/shows/downton-abbey/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
