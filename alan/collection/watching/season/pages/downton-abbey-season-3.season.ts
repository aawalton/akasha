import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const downtonAbbeySeason3 = {
  id: "01a06802-b8b9-702a-8992-7235f0d73dfa",
  type: "page-type/season",
  slug: "downton-abbey-season-3",
  title: "Downton Abbey Season 3",
  partOfCollections: ["show/downton-abbey"],
  position: 3,
  ownLength: 438,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-09-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-45536",
      externalLink: "https://trakt.tv/shows/downton-abbey/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
