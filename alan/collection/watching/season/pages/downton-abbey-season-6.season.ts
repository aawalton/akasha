import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const downtonAbbeySeason6 = {
  id: "01a06802-b8b9-702d-9ced-36512188ce3a",
  type: "page-type/season",
  slug: "downton-abbey-season-6",
  title: "Downton Abbey Season 6",
  partOfCollections: ["show/downton-abbey"],
  position: 6,
  ownLength: 445.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-09-20",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-97359",
      externalLink: "https://trakt.tv/shows/downton-abbey/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
