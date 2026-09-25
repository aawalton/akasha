import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const downtonAbbeySeason1 = {
  id: "01a06802-b8b9-7028-896b-a0d5b75a9d4e",
  type: "page-type/season",
  slug: "downton-abbey-season-1",
  title: "Downton Abbey Season 1",
  partOfCollections: ["show/downton-abbey"],
  position: 1,
  ownLength: 379.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-45534",
      externalLink: "https://trakt.tv/shows/downton-abbey/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
