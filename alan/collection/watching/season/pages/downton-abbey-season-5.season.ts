import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const downtonAbbeySeason5 = {
  id: "01a06802-b8b9-702c-af8c-fda06c223300",
  type: "page-type/season",
  slug: "downton-abbey-season-5",
  title: "Downton Abbey Season 5",
  partOfCollections: ["show/downton-abbey"],
  position: 5,
  ownLength: 439.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-45538",
      externalLink: "https://trakt.tv/shows/downton-abbey/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
