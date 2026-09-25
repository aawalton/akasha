import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const downtonAbbeySeason4 = {
  id: "01a06802-b8b9-702b-9a47-af20e085d9d1",
  type: "page-type/season",
  slug: "downton-abbey-season-4",
  title: "Downton Abbey Season 4",
  partOfCollections: ["show/downton-abbey"],
  position: 4,
  ownLength: 438,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-09-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-45537",
      externalLink: "https://trakt.tv/shows/downton-abbey/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
